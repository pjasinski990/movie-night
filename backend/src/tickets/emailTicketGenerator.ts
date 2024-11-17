export function generateMovieTicketEmail(
    tickets: {
        movie: string;
        date: string;
        time: string;
        seat: string;
    }[],
    qrCodeCID: string
): { html: string; plainText: string } {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Tickets</title>
</head>
<body style="margin: 0; padding: 0;">
    <table style="width: 100%; background-color: #001225; color: white; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border-radius: 5px; overflow: hidden;">
        <tr>
            <td style="background-color: #00050c; color: #fff7ce; padding: 10px; text-align: center;">
                <h1 style="margin: 0;">Your Movie Tickets</h1>
            </td>
        </tr>
        ${tickets
        .map((ticket, index) => {
            const isLast = index === tickets.length - 1;
            return `
        <tr>
            <td style="padding: 0 24px;">
                <table style="width: 100%; background-color: #00050c; margin: 16px 0; padding: 12px 0; border-radius: 8px;">
                    <tr>
                        <td style="padding: 0 24px; vertical-align: top;">
                            <p style="margin: 5px 0; color: white;">Movie: <strong>${ticket.movie}</strong></p>
                            <p style="margin: 5px 0; color: white;">Date: <strong>${ticket.date}</strong></p>
                            <p style="margin: 5px 0; color: white;">Time: <strong>${ticket.time}</strong></p>
                            <p style="margin: 5px 0; color: white;">Seat: <strong>${ticket.seat}</strong></p>
                        </td>
                        <td style="padding: 0 24px; width: 100px; vertical-align: top; border-left: 2px dashed #fff7ce;">
                            <img src="cid:${qrCodeCID}" alt="QR Code" style="width: 100%; height: auto;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        ${
                !isLast
                    ? `<tr><td><hr style="border: none; border-top: 1px solid #001831; margin: 0 24px;"></td></tr>`
                    : ''
            }
        `;
        })
        .join('')}
        <tr>
            <td style="text-align: center; padding: 10px; background-color: #001225;">
                <small style="color: #001831;">꩜꩜꩜꩜꩜꩜꩜꩜꩜꩜꩜꩜꩜</small>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    const plainText = tickets
        .map(
            (ticket) =>
                `Movie: ${ticket.movie}\nDate: ${ticket.date}\nTime: ${ticket.time}\nSeat: ${ticket.seat}`
        )
        .join('\n\n---\n\n');

    return { html, plainText };
}
