pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        DEPLOY_NAME               = "movie-night"
        FRONTEND_IMAGE_NAME       = "movie-night-frontend"
        BACKEND_IMAGE_NAME        = "movie-night-backend"
        DOCKER_REGISTRY_URL       = "${env.DOCKER_REGISTRY_URL}"
        DEPLOY_TARGET_HOST        = "${env.DEPLOY_TARGET_HOST}"
        DEPLOY_USER               = "${env.DEPLOY_USER}"

        DEPLOY_TARGET_DIR         = "/home/${DEPLOY_USER}/${DEPLOY_NAME}"
        FRONTEND_TAG_NAME         = ""
        BACKEND_TAG_NAME          = ""
    }

    stages {
        stage('Initialize') {
            steps {
                cleanupDockerImages()
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build prod image') {
            steps {
                script {
                    sh """
                        export MYSQL_PASSWORD=${MOVIE_NIGHT_MYSQL_PASSWORD}
                        export MYSQL_ROOT_PASSWORD=${MOVIE_NIGHT_MYSQL_ROOT_PASSWORD}
                        export SENDGRID_API_KEY=${SENDGRID_API_KEY}
                        export EMAIL_NOTIFICATION_TO=${PRIVATE_EMAIL_ADDRESS}
                        make prod
                    """
                }
            }
        }

        stage('Tag & Push') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo """Running Tag & Push for:
                        DEPLOY_NAME: ${DEPLOY_NAME}
                        FRONTEND_IMAGE_NAME: ${FRONTEND_IMAGE_NAME}
                        BACKEND_IMAGE_NAME: ${BACKEND_IMAGE_NAME}
                        DOCKER_REGISTRY_URL: ${DOCKER_REGISTRY_URL}
                        DEPLOY_USER: ${DEPLOY_USER}
                        DEPLOY_TARGET_HOST: ${DEPLOY_TARGET_HOST}
                    """

                    def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    FRONTEND_TAG_NAME = "${FRONTEND_IMAGE_NAME}:${commitHash}"
                    BACKEND_TAG_NAME = "${BACKEND_IMAGE_NAME}:${commitHash}"

                    echo "Creating and pushing tag: ${FRONTEND_TAG_NAME}"
                    sh "docker tag ${FRONTEND_IMAGE_NAME} ${DOCKER_REGISTRY_URL}/${FRONTEND_TAG_NAME}"
                    sh "docker push ${DOCKER_REGISTRY_URL}/${FRONTEND_TAG_NAME}"
                    echo "Successfully pushed ${FRONTEND_TAG_NAME} to Docker registry"

                    echo "Creating and pushing tag: ${BACKEND_TAG_NAME}"
                    sh "docker tag ${BACKEND_IMAGE_NAME} ${DOCKER_REGISTRY_URL}/${BACKEND_TAG_NAME}"
                    sh "docker push ${DOCKER_REGISTRY_URL}/${BACKEND_TAG_NAME}"
                    echo "Successfully pushed ${BACKEND_TAG_NAME} to Docker registry"
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        export DOCKER_REGISTRY_URL=${DOCKER_REGISTRY_URL}
                        export FRONTEND_TAG_NAME=${FRONTEND_TAG_NAME}
                        export BACKEND_TAG_NAME=${BACKEND_TAG_NAME}

                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_TARGET_HOST} \\
                            "mkdir -p ${DEPLOY_TARGET_DIR}"

                        scp -o StrictHostKeyChecking=no \
                            docker-compose.prod.yml \
                            ${DEPLOY_USER}@${DEPLOY_TARGET_HOST}:${DEPLOY_TARGET_DIR}/docker-compose.yml

                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_TARGET_HOST} \\
                            "cd ${DEPLOY_TARGET_DIR} \
                                && export DOCKER_REGISTRY_URL=${DOCKER_REGISTRY_URL} \
                                && export FRONTEND_TAG_NAME=${FRONTEND_TAG_NAME} \
                                && export BACKEND_TAG_NAME=${BACKEND_TAG_NAME} \
                                && export MOVIE_NIGHT_MYSQL_PASSWORD=${MOVIE_NIGHT_MYSQL_PASSWORD} \
                                && export MOVIE_NIGHT_MYSQL_ROOT_PASSWORD=${MOVIE_NIGHT_MYSQL_ROOT_PASSWORD} \
                                && export SENDGRID_API_KEY=${SENDGRID_API_KEY} \
                                && export PRIVATE_EMAIL_ADDRESS=${PRIVATE_EMAIL_ADDRESS} \
                                && docker-compose pull \
                                && docker-compose down && docker image prune -f && docker-compose up -d
                            "
                    """
                }
            }
        }
    }

    post {
        always {
            cleanupDockerImages()
            cleanWs()
        }
    }
}

def cleanupDockerImages() {
    sh '''
        cleanup() {
            echo "Cleaning up containers based on ${FRONTEND_IMAGE_NAME} and ${BACKEND_IMAGE_NAME}"

            FRONTEND_CONTAINERS=$(docker ps -q --filter "ancestor=${FRONTEND_IMAGE_NAME}" || true)
            if [ -n "$FRONTEND_CONTAINERS" ]; then
              echo "Stopping and removing containers for ${FRONTEND_IMAGE_NAME}"
              docker stop $FRONTEND_CONTAINERS
              docker rm $FRONTEND_CONTAINERS
            fi

            BACKEND_CONTAINERS=$(docker ps -q --filter "ancestor=${BACKEND_IMAGE_NAME}" || true)
            if [ -n "$BACKEND_CONTAINERS" ]; then
              echo "Stopping and removing containers for ${BACKEND_IMAGE_NAME}"
              docker stop $BACKEND_CONTAINERS
              docker rm $BACKEND_CONTAINERS
            fi

            echo "Removing image ${FRONTEND_IMAGE_NAME}"
            docker rmi -f ${FRONTEND_IMAGE_NAME} || true
            echo "Removing image ${BACKEND_IMAGE_NAME}"
            docker rmi -f ${BACKEND_IMAGE_NAME} || true

            docker system prune -af || true
        }
        cleanup
    '''
}
