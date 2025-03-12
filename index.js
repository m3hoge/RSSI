import { exec } from "child_process";
import fs from "fs";

function writeToHtml(data) {
    let dist = data;
    dist = dist * -1;
    const html = `<!DOCTYPE html>
<html>
    <head>
        <title>RSSI</title>
        <style>
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }

            #container {
                position: relative;
                width: 400px;
                height: 200px;
            }

            .icon {
                position: absolute;
                width: 50px;
                height: 50px;
            }

            #car {
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }

            #beacon {
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }

            #arrow {
                position: absolute;
                top: 50%;
                left: 50px;
                transform: translateY(-50%);
                width: 300px;
                height: 5px;
                background-color: black;
            }

            #distance {
                font-size: 48px;
                font-weight: bold;
                font-family: sans-serif;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div id="container">
            <img src="car.jpg" alt="車" class="icon" id="car" />
            <div id="arrow"></div>
            <img src="beacon.jpg" alt="ビーコン" class="icon" id="beacon" />
        </div>
        <div id="distance"></div>

        <script>
            const car = document.getElementById("car");
            const beacon = document.getElementById("beacon");
            const arrow = document.getElementById("arrow");
            const distanceDisplay = document.getElementById("distance");

            const distance = ${dist}; // 距離の初期値

            function updatePosition() {
                const carLeft = 0;
                const beaconLeft = carLeft + 50 + distance * 3; // 車の幅 + 距離
                const arrowWidth = distance * 3;

                car.style.left = carLeft + "px";
                beacon.style.left = beaconLeft + "px";
                arrow.style.width = arrowWidth + "px";

                distanceDisplay.textContent = distance;
            }

            updatePosition();
        </script>
    </body>
</html>
`;

    fs.writeFileSync("index.html", html);
}

setInterval(() => {
    exec("./wifi.sh", (error, stdout, stderr) => {
        if (error) {
            console.error(`エラー: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`エラー: ${stderr}`);
            return;
        }
        writeToHtml(stdout);
    });
}, 300);
