function showNumberSystem() {
    const calculator = document.getElementById("number-system");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function convertNumber() {

    const type = document.getElementById("conversion").value;
    const input = document.getElementById("numberInput").value.trim();
    const result = document.getElementById("result");

    if (input === "") {
        result.textContent = "Please enter a number.";
        return;
    }

    let answer;

    try {

        if (type === "decimal-binary") {

            const number = Number(input);

            if (!Number.isInteger(number) || number < 0) {
                throw new Error();
            }

            answer = number.toString(2);

        }

        else if (type === "binary-decimal") {

            if (!/^[01]+$/.test(input)) {
                throw new Error();
            }

            answer = parseInt(input, 2).toString(10);

        }

        else if (type === "decimal-octal") {

    const number = Number(input);

    if (!Number.isInteger(number) || number < 0) {
        throw new Error();
    }

    answer = number.toString(8);

}

else if (type === "octal-decimal") {

    if (!/^[0-7]+$/.test(input)) {
        throw new Error();
    }

    answer = parseInt(input, 8).toString(10);

}

else if (type === "binary-octal") {

    if (!/^[01]+$/.test(input)) {
        throw new Error();
    }

    answer = parseInt(input, 2)
        .toString(8);

}

else if (type === "octal-binary") {

    if (!/^[0-7]+$/.test(input)) {
        throw new Error();
    }

    answer = parseInt(input, 8)
        .toString(2);

}

        else if (type === "decimal-hex") {

            const number = Number(input);

            if (!Number.isInteger(number) || number < 0) {
                throw new Error();
            }

            answer = number.toString(16).toUpperCase();

        }

        else if (type === "hex-decimal") {

            if (!/^[0-9A-Fa-f]+$/.test(input)) {
                throw new Error();
            }

            answer = parseInt(input, 16).toString(10);

        }

        else if (type === "binary-hex") {

            if (!/^[01]+$/.test(input)) {
                throw new Error();
            }

            answer = parseInt(input, 2)
                .toString(16)
                .toUpperCase();

        }

        else if (type === "hex-binary") {

            if (!/^[0-9A-Fa-f]+$/.test(input)) {
                throw new Error();
            }

            answer = parseInt(input, 16)
                .toString(2);

        }

        result.textContent = `Result: ${answer}`;

    } catch {

        result.textContent = "Invalid input.";
    }
}
function showNetworking() {

    const calculator = document.getElementById("networking");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}

function calculateNetwork() {

    const ip = document.getElementById("ipInput").value.trim();
    const cidr = Number(document.getElementById("cidrInput").value);
    const result = document.getElementById("networkResult");

    // Check IP format
    const parts = ip.split(".");

    if (
        parts.length !== 4 ||
        parts.some(part => {
            const num = Number(part);
            return part === "" ||! 
            Number.isInteger(num) || num < 0 || num > 255;
        })
    ) {
        result.textContent = "Invalid IP Address.";
        return;
    }

    // Convert IP to 32-bit number
    const ipNumber =
        (Number(parts[0]) << 24) |
        (Number(parts[1]) << 16) |
        (Number(parts[2]) << 8) |
        Number(parts[3]);

    // Create subnet mask
    const mask =
        cidr === 0
            ? 0
            : (0xFFFFFFFF << (32 - cidr)) >>> 0;

    // Network address
    const network = (ipNumber >>> 0) & mask;

    // Broadcast address
    const broadcast =
        (network | (~mask >>> 0)) >>> 0;

    // Convert number back to IP
    function numberToIP(number) {

        return [
            (number >>> 24) & 255,
            (number >>> 16) & 255,
            (number >>> 8) & 255,
            number & 255
        ].join(".");
    }

    const networkIP = numberToIP(network);
    const broadcastIP = numberToIP(broadcast);
    const subnetMask = numberToIP(mask);

    let firstHost;
    let lastHost;
    let usableHosts;

    if (cidr === 32) {

        firstHost = networkIP;
        lastHost = networkIP;
        usableHosts = 1;

    } else if (cidr === 31) {

        firstHost = networkIP;
        lastHost = broadcastIP;
        usableHosts = 2;

    } else {

        firstHost = numberToIP(network + 1);
        lastHost = numberToIP(broadcast - 1);

        usableHosts = Math.pow(2, 32 - cidr) - 2;
    }

    result.innerHTML = `
    <p><strong>IP Address:</strong> ${ip}</p>
    <p><strong>CIDR:</strong> /${cidr}</p>
    <p><strong>Subnet Mask:</strong> ${subnetMask}</p>
    <p><strong>Network Address:</strong> ${networkIP}</p>
    <p><strong>Broadcast Address:</strong> ${broadcastIP}</p>
    <p><strong>First Host:</strong> ${firstHost}</p>
    <p><strong>Last Host:</strong> ${lastHost}</p>
    <p><strong>Usable Hosts:</strong> ${usableHosts}</p>
    <p><strong>Total IP Addresses:</strong> ${Math.pow(2, 32 - cidr)}</p>
`;
}
function calculateSubnetInfo() {

    const cidr = Number(document.getElementById("cidrInput").value);
    const result = document.getElementById("networkResult");

    // Number of total IP addresses
    const totalIPs = Math.pow(2, 32 - cidr);

    // Number of usable host addresses
    let usableHosts;

    if (cidr === 32) {
        usableHosts = 1;
    } else if (cidr === 31) {
        usableHosts = 2;
    } else {
        usableHosts = totalIPs - 2;
    }

    result.innerHTML += `
        <hr>
        <p><strong>Total IP Addresses:</strong> ${totalIPs}</p>
        <p><strong>Usable Host Addresses:</strong> ${usableHosts}</p>
    `;
}

function showConstruction() {

    const calculator = document.getElementById("construction");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}

function calculateConcrete() {

    const volume = Number(
        document.getElementById("concreteVolume").value
    );

    const ratio = document.getElementById("mixRatio").value;

    const result = document.getElementById("constructionResult");

    if (!volume || volume <= 0) {
        result.textContent = "Please enter a valid concrete volume.";
        return;
    }

    // Dry volume factor
    const dryVolume = volume * 1.54;

    let cementPart;
    let sandPart;
    let aggregatePart;

    if (ratio === "1:2:4") {
        cementPart = 1;
        sandPart = 2;
        aggregatePart = 4;
    }

    else if (ratio === "1:1.5:3") {
        cementPart = 1;
        sandPart = 1.5;
        aggregatePart = 3;
    }

    const totalParts =
        cementPart + sandPart + aggregatePart;

    // Material volumes
    const cementVolume =
        dryVolume * cementPart / totalParts;

    const sandVolume =
        dryVolume * sandPart / totalParts;

    const aggregateVolume =
        dryVolume * aggregatePart / totalParts;

    // Approximate cement weight
    const cementWeight = cementVolume * 1440;

console.log("cementVolume =", cementVolume);
console.log("cementWeight =", cementWeight);

const cementBags = cementWeight / 50;

    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>Concrete Volume:</strong>
            ${volume.toFixed(2)} m³
        </p>

        <p>
            <strong>Dry Volume:</strong>
            ${dryVolume.toFixed(2)} m³
        </p>

        <p>
            <strong>Cement:</strong>
            ${cementWeight.toFixed(2)} kg
        </p>

        <p>
            <strong>Cement Bags:</strong>
            ${cementBags.toFixed(2)} bags
        </p>

        <p>
            <strong>Sand:</strong>
            ${sandVolume.toFixed(2)} m³
        </p>

        <p>
            <strong>Aggregate:</strong>
            ${aggregateVolume.toFixed(2)} m³
        </p>
    `;
}

function showBrickCalculator() {

    const calculator =
        document.getElementById("brick-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}

function calculateBricks() {

    const length = Number(
        document.getElementById("wallLength").value
    );

    const height = Number(
        document.getElementById("wallHeight").value
    );

    const thickness = Number(
        document.getElementById("wallThickness").value
    );

    const mortarRatio =
        document.getElementById("mortarRatio").value;

    const result =
        document.getElementById("brickResult");

    if (length <= 0 || height <= 0) {
        result.textContent =
            "Please enter valid wall dimensions.";
        return;
    }

    // Wall volume
    const wallVolume =
        length * height * thickness;

    // Approximate bricks per cubic meter
    const bricksPerM3 = 500;

    // Brick quantity
    const brickQuantity =
        wallVolume * bricksPerM3;

    // 5% brick wastage
    const brickWastage =
        brickQuantity * 0.05;

    const totalBricks =
        brickQuantity + brickWastage;


    // Approximate mortar volume
    const mortarVolume =
        wallVolume * 0.20;

    // Dry mortar volume
    const dryMortarVolume =
        mortarVolume * 1.33;


    // Mortar ratio
    const ratioParts =
        mortarRatio.split(":");

    const cementPart =
        Number(ratioParts[0]);

    const sandPart =
        Number(ratioParts[1]);

    const totalParts =
        cementPart + sandPart;


    // Cement volume
    const cementVolume =
        dryMortarVolume *
        cementPart /
        totalParts;

    // Sand volume
    const sandVolume =
        dryMortarVolume *
        sandPart /
        totalParts;


    // Cement weight
    const cementWeight =
        cementVolume * 1440;

    // Cement bags
    const cementBags =
        cementWeight / 50;


    result.innerHTML =`
        <h3>Calculation Result</h3>

        <p>
            <strong>Wall Volume:</strong>
            ${wallVolume.toFixed(2)} m³
        </p>

        <p>
            <strong>Total Bricks:</strong>
            ${Math.ceil(totalBricks)}
        </p>

        <hr>

        <p>
            <strong>Mortar Volume:</strong>
            ${mortarVolume.toFixed(2)} m³
        </p>

        <p>
            <strong>Mortar Mix:</strong>
            ${mortarRatio}
        </p>

        <p>
            <strong>Cement:</strong>
            ${cementWeight.toFixed(2)} kg
        </p>

        <p>
            <strong>Cement Bags:</strong>
            ${cementBags.toFixed(2)} bags
        </p>

        <p>
            <strong>Sand:</strong>
            ${sandVolume.toFixed(2)} m³
        </p>
    `;
}
function showTileCalculator() {

    const calculator =
        document.getElementById("tile-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function calculateTiles() {

    const floorLength =
        Number(document.getElementById("floorLength").value);

    const floorWidth =
        Number(document.getElementById("floorWidth").value);

    const tileLength =
        Number(document.getElementById("tileLength").value);

    const tileWidth =
        Number(document.getElementById("tileWidth").value);

    const wastage =
        Number(document.getElementById("tileWastage").value);

    const result =
        document.getElementById("tileResult");


    // Validate input
    if (
        floorLength <= 0 ||
        floorWidth <= 0 ||
        tileLength <= 0 ||
        tileWidth <= 0 ||
        wastage < 0
    ) {
        result.textContent =
            "Please enter valid values.";
        return;
    }


    // Floor area
    const floorArea =
        floorLength * floorWidth;


    // Convert tile cm → m
    const tileLengthM =
        tileLength / 100;

    const tileWidthM =
        tileWidth / 100;


    // Tile area
    const tileArea =
        tileLengthM * tileWidthM;


    // Basic tile quantity
    const basicTiles =
        floorArea / tileArea;


    // Wastage
    const wastageTiles =
        basicTiles * wastage / 100;


    // Total
    const totalTiles =
        basicTiles + wastageTiles;


    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>Floor Area:</strong>
            ${floorArea.toFixed(2)} m²
        </p>

        <p>
            <strong>Tile Area:</strong>
            ${tileArea.toFixed(4)} m²
        </p>

        <p>
            <strong>Basic Tiles:</strong>
            ${Math.ceil(basicTiles)}
        </p>

        <p>
            <strong>Wastage (${wastage}%):</strong>
            ${Math.ceil(wastageTiles)}
        </p>

        <p>
            <strong>Total Tiles:</strong>
            ${Math.ceil(totalTiles)}
        </p>
    `;
}
function showDosageCalculator() {

    const calculator =
        document.getElementById("dosage-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function calculateDosage() {

    const orderedDose =
        Number(document.getElementById("orderedDose").value);

    const availableDose =
        Number(document.getElementById("availableDose").value);

    const availableQuantity =
        Number(document.getElementById("availableQuantity").value);

    const result =
        document.getElementById("dosageResult");


    // Validate input
    if (
        orderedDose <= 0 ||
        availableDose <= 0 ||
        availableQuantity <= 0
    ) {
        result.textContent =
            "Please enter valid values.";
        return;
    }


    // Formula:
    // Ordered Dose ÷ Available Dose × Available Quantity

    const requiredQuantity =
        (orderedDose / availableDose) *
        availableQuantity;


    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>Ordered Dose:</strong>
            ${orderedDose} mg
        </p>

        <p>
            <strong>Available Dose:</strong>
            ${availableDose} mg
        </p>

        <p>
            <strong>Available Quantity:</strong>
            ${availableQuantity}
        </p>

        <hr>

        <p>
            <strong>Required Quantity:</strong>
            ${requiredQuantity.toFixed(2)}
        </p>
    `;
}
function showIVCalculator() {

    const calculator =
        document.getElementById("iv-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}

function calculateIV() {

    const volume =
        Number(document.getElementById("ivVolume").value);

    const time =
        Number(document.getElementById("ivTime").value);

    const dropFactor =
        Number(document.getElementById("dropFactor").value);

    const result =
        document.getElementById("ivResult");

    if (
        volume <= 0 ||
        time <= 0 ||
        dropFactor <= 0
    ) {
        result.textContent =
            "Please enter valid values.";
        return;
    }

    // mL/hour
    const ivRate =
        volume / time;

    // drops/minute
    const dripRate =
        (volume * dropFactor) / (time * 60);

    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>IV Volume:</strong>
            ${volume} mL
        </p>

        <p>
            <strong>Time:</strong>
            ${time} hours
        </p>

        <p>
            <strong>Drop Factor:</strong>
            ${dropFactor} drops/mL
        </p>

        <hr>

        <p>
            <strong>IV Flow Rate:</strong>
            ${ivRate.toFixed(2)} mL/hour
        </p>

        <p>
            <strong>Drip Rate:</strong>
            ${dripRate.toFixed(2)} drops/min
        </p>
    `;
}
function showIVTimeCalculator() {

    const calculator =
        document.getElementById("iv-time-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function calculateIVTime() {

    const volume =
        Number(document.getElementById("infusionVolume").value);

    const flowRate =
        Number(document.getElementById("flowRate").value);

    const result =
        document.getElementById("ivTimeResult");

    if (volume <= 0 || flowRate <= 0) {
        result.textContent =
            "Please enter valid values.";
        return;
    }

    // Total time in hours
    const totalHours =
        volume / flowRate;

    // Convert hours to hours + minutes
    const hours =
        Math.floor(totalHours);

    const minutes =
        Math.round((totalHours - hours) * 60);

    // Handle 60 minutes
    if (minutes === 60) {
        result.innerHTML = `
            <h3>Calculation Result</h3>

            <p>
                <strong>Infusion Time:</strong>
                ${hours + 1} hours
            </p>
        `;
        return;
    }

    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>IV Volume:</strong>
            ${volume} mL
        </p>

        <p>
            <strong>Flow Rate:</strong>
            ${flowRate} mL/hour
        </p>

        <hr>

        <p>
            <strong>Infusion Time:</strong>
            ${hours} hours ${minutes} minutes
        </p>
    `;
}
function showDilutionCalculator() {

    const calculator =
        document.getElementById("dilution-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function calculateDilution() {

    const requiredDose =
        Number(
            document.getElementById("requiredDrugDose").value
        );

    const availableDose =
        Number(
            document.getElementById("availableDrugDose").value
        );

    const availableVolume =
        Number(
            document.getElementById("availableDrugVolume").value
        );

    const result =
        document.getElementById("dilutionResult");

    if (
        requiredDose <= 0 ||
        availableDose <= 0 ||
        availableVolume <= 0
    ) {
        result.textContent =
            "Please enter valid values.";
        return;
    }

    // Step 1:
    // Calculate concentration

    const concentration =
        availableDose / availableVolume;

    // Step 2:
    // Calculate required volume

    const requiredVolume =
        requiredDose / concentration;

    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>Required Dose:</strong>
            ${requiredDose} mg
        </p>

        <p>
            <strong>Available Drug:</strong>
            ${availableDose} mg
        </p>

        <p>
            <strong>Available Volume:</strong>
            ${availableVolume} mL
        </p>

        <hr>

        <p>
            <strong>Concentration:</strong>
            ${concentration.toFixed(2)} mg/mL
        </p>

        <p>
            <strong>Required Volume:</strong>
            ${requiredVolume.toFixed(2)} mL
        </p>
    `;
}
function showRebarCalculator() {

    const calculator =
        document.getElementById("rebar-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function calculateRebar() {

    const diameter =
        Number(document.getElementById("barDiameter").value);

    const length =
        Number(document.getElementById("barLength").value);

    const quantity =
        Number(document.getElementById("barQuantity").value);

    const wastage =
        Number(document.getElementById("steelWastage").value);

    const price =
        Number(document.getElementById("steelPrice").value);

    const result =
        document.getElementById("rebarResult");


    // Validate input
    if (
        diameter <= 0 ||
        length <= 0 ||
        quantity <= 0 ||
        wastage < 0 ||
        price < 0
    ) {
        result.textContent =
            "Please enter valid values.";
        return;
    }


    // 1. Unit weight
    const unitWeight =
        (diameter * diameter) / 162;


    // 2. Total bar length
    const totalLength =
        length * quantity;


    // 3. Basic steel weight
    const basicWeight =
        unitWeight * totalLength;


    // 4. Wastage weight
    const wastageWeight =
        basicWeight * wastage / 100;


    // 5. Final steel weight
    const finalWeight =
        basicWeight + wastageWeight;


    // 6. Estimated cost
    const totalCost =
        finalWeight * price;


    result.innerHTML = `
        <h3>Calculation Result</h3>

        <p>
            <strong>Bar Diameter:</strong>
            ${diameter} mm
        </p>

        <p>
            <strong>Length per Bar:</strong>
            ${length.toFixed(2)} m
        </p>

        <p>
            <strong>Number of Bars:</strong>
            ${quantity}
        </p>

        <hr>

        <p>
            <strong>Unit Weight:</strong>
            ${unitWeight.toFixed(3)} kg/m
        </p>

        <p>
            <strong>Total Bar Length:</strong>
            ${totalLength.toFixed(2)} m
        </p>

        <p>
            <strong>Basic Steel Weight:</strong>
            ${basicWeight.toFixed(2)} kg
        </p>

        <p>
            <strong>Wastage Weight:</strong>
            ${wastageWeight.toFixed(2)} kg
        </p>

        <p>
            <strong>Final Steel Weight:</strong>
            ${finalWeight.toFixed(2)} kg
        </p>

        <p>
            <strong>Estimated Cost:</strong>
            ${totalCost.toFixed(2)}
        </p>
    `;
}
function showTruthTable() {

    const calculator =
        document.getElementById("truth-table-calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}
function generateTruthTable() {

    const expression =
        document.getElementById("logicExpression").value
            .trim()
            .toUpperCase();

    const result =
        document.getElementById("truthTableResult");


    if (expression === "") {
        result.textContent =
            "Please enter a Boolean expression.";
        return;
    }


    try {

        // 1. Tokenize
        const tokens =
            tokenizeBooleanExpression(expression);


        // 2. Find variables
        const variables =
            [
                ...new Set(
                    tokens.filter(
                        token => /^[A-Z]$/.test(token)
                    )
                )
            ].sort();


        if (variables.length === 0) {
            throw new Error(
                "No variables found."
            );
        }


        if (variables.length > 6) {
            throw new Error(
                "Please use 6 or fewer variables."
            );
        }


        // 3. Convert to Postfix
        const postfix =
            toPostfix(tokens);


        // 4. Number of rows
        const rows =
            Math.pow(2, variables.length);


        let table = `
            <table border="1"
                cellpadding="8"
                style="
                    width:100%;
                    text-align:center;
                    border-collapse:collapse;
                ">

                <thead>
                    <tr>
        `;


        // Variable headers
        variables.forEach(variable => {

            table += `
                <th>${variable}</th>
            `;
        });


        table += `
                <th>Result</th>
            </tr>
        </thead>

        <tbody>
        `;


        // Generate rows
        for (let i = 0; i < rows; i++) {

            const values = {};


            variables.forEach(
                (variable, index) => {

                    values[variable] =
                        (i >>
                        (variables.length - index - 1))
                        & 1;
                }
            );


            // Evaluate expression
            const output =
                evaluateBooleanExpression(
                    postfix,
                    values
                );


            table += `<tr>`;


            variables.forEach(variable => {

                table += `
                    <td>
                        ${values[variable]}
                    </td>
                `;
            });


            table += `
                <td>
                    <strong>${output}</strong>
                </td>
            `;


            table += `</tr>`;
        }


        table +=`
                </tbody>
            </table>
        `;


        // Display result
        result.innerHTML = `
            <h3>Truth Table</h3>

            <p>
                <strong>Expression:</strong>
                ${expression}
            </p>

            <p>
                <strong>Variables:</strong>
                ${variables.join(", ")}
            </p>

            <p>
                <strong>Total Rows:</strong>
                ${rows}
            </p>

            ${table}
        `;


    } catch (error) {

        result.textContent =
            error.message;
    }
}
function tokenizeBooleanExpression(expression) {

    const normalized =
    expression
        .toUpperCase()
        .replace(/<=>/g, " EQUIV ")
        .replace(/=>/g, " IMPLIES ")
        .replace(/→/g, " IMPLIES ")
        .replace(/↔/g, " EQUIV ")
        .replace(/∧/g, " AND ")
        .replace(/∨/g, " OR ")
        .replace(/¬/g, " NOT ")
        .replace(/⊕/g, " XOR ");
    const tokens =
        normalized.match(
            /NAND|XNOR|IMPLIES|EQUIV|AND|NOT|XOR|NOR|OR|[A-Z]|\(|\)/g
        );

    if (!tokens) {
        throw new Error("Invalid expression.");
    }

    return tokens;
}


const booleanPrecedence = {
    "EQUIV": 1,
    "IMPLIES": 2,
    "OR": 3,
    "XOR": 4,
    "NAND": 5,
    "NOR": 5,
    "XNOR": 5,
    "AND": 6,
    "NOT": 7
};


function isBooleanOperator(token) {
    return Object.prototype.hasOwnProperty.call(
        booleanPrecedence,
        token
    );
}


function toPostfix(tokens) {

    const output = [];
    const operators = [];

    tokens.forEach(token => {

        if (/^[A-Z]$/.test(token)) {

            output.push(token);

        }

        else if (token === "(") {

            operators.push(token);

        }

        else if (token === ")") {

            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== "("
            ) {
                output.push(operators.pop());
            }

            if (operators.length === 0) {
                throw new Error("Mismatched parentheses.");
            }

            operators.pop();
        }

        else if (isBooleanOperator(token)) {

            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== "(" &&
                booleanPrecedence[
                    operators[operators.length - 1]
                ] >= booleanPrecedence[token]
            ) {
                output.push(operators.pop());
            }

            operators.push(token);
        }

        else {

            throw new Error(
                `Unknown token: ${token}`
            );
        }
    });


    while (operators.length > 0) {

        const operator = operators.pop();

        if (operator === "(") {
            throw new Error("Mismatched parentheses.");
        }

        output.push(operator);
    }


    return output;
}
console.log(
    toPostfix(
        tokenizeBooleanExpression(
            "(A AND B) OR NOT C"
        )
    )
);
function evaluateBooleanExpression(postfix, values) {

    const stack = [];

    postfix.forEach(token => {

        // Variable
        if (/^[A-Z]$/.test(token)) {

            stack.push(values[token]);
            return;
        }


        // NOT
        if (token === "NOT") {

            if (stack.length < 1) {
                throw new Error("Invalid NOT expression.");
            }

            const a = stack.pop();

            stack.push(a ? 0 : 1);

            return;
        }


        // Binary operators
        if (stack.length < 2) {
            throw new Error("Invalid Boolean expression.");
        }

        const b = stack.pop();
        const a = stack.pop();

        let result;


        if (token === "AND") {
            result = a && b ? 1 : 0;
        }

        else if (token === "OR") {
            result = a || b ? 1 : 0;
        }

        else if (token === "XOR") {
            result = a !== b ? 1 : 0;
        }

        else if (token === "NAND") {
            result = a && b ? 0 : 1;
        }

        else if (token === "NOR") {
            result = a || b ? 0 : 1;
        }

        else if (token === "XNOR") {
            result = a === b ? 1 : 0;
        }

        else if (token === "IMPLIES") {
            result = (!a || b) ? 1 : 0;
        }

        else if (token === "EQUIV") {
            result = a === b ? 1 : 0;
        }

        else {
            throw new Error(
                `Unknown operator: ${token}`
            );
        }


        stack.push(result);
    });


    if (stack.length !== 1) {
        throw new Error("Invalid Boolean expression.");
    }


    return stack[0];
}
const tokens =
    tokenizeBooleanExpression("(A AND B) OR NOT C");

const postfix =
    toPostfix(tokens);

console.log(
    evaluateBooleanExpression(
        postfix,
        {
            A: 1,
            B: 1,
            C: 0
        }
    )
);