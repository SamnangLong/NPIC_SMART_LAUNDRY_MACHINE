// Initialize button states (no localStorage)
let buttonStates = {
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    B5: 0,
    B6: 0,
    B7: 0,
    B8: 0,
    B9: 0,
    B10: 0,
    B11: 0
};

// Function to publish the message for 'touch' topic
function publishTouch(retain) {
    const message = `B1=${buttonStates.B1}, B2=${buttonStates.B2}, B3=${buttonStates.B3}, B4=${buttonStates.B4}, B5=${buttonStates.B5}, B6=${buttonStates.B6}, B7=${buttonStates.B7}, B8=${buttonStates.B8}, B9=${buttonStates.B9}, B10=${buttonStates.B10}, B11=${buttonStates.B11}`;
    
    // Publish the message with retain flag
    client.send('touch', message, 0, retain); // '0' is the QoS, 'retain' is the retain flag
    
    console.log("Published to topic 'touch':", message);
}

// Function to publish the message for 'info' topic
function publishInfo(buttonId) {
    const message = `B${buttonId}=1,Device_Name=${client.clientId}`;
    
    // Publish to 'info' topic
    client.send('info', message); 
    
    console.log("Published to topic 'info':", message);
}

// Handle button click for soap button
function btn_soap() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.soap');
        
        // Disable the button visually
        document.querySelector('.soap').style.backgroundColor = 'gray';
        const soapImg = document.querySelector('#soap');
        soapImg.style.opacity = '0.5'; 
        soapImg.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B1 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B1'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_fabric() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.fabric');
        

        // Disable the button visually
        document.querySelector('.fabric').style.backgroundColor = 'gray';
        const fabricImg = document.querySelector('#fabric');
        fabricImg.style.opacity = '0.5'; 
        fabricImg.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B2 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B2'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


// Handle button click for soap button
function btn_ws_9kg1() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.washing_9kg_1');
        
        // Disable the button visually
        document.querySelector('.washing_9kg_1').style.backgroundColor = 'gray';
        const washing_9kg_1Img = document.querySelector('#washing_9kg_1');
        washing_9kg_1Img.style.opacity = '0.5'; 
        washing_9kg_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B3 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B3'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_ws_9kg2() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.washing_9kg_2');
        

        // Disable the button visually
        document.querySelector('.washing_9kg_2').style.backgroundColor = 'gray';
        const washing_9kg_2Img = document.querySelector('#washing_9kg_2');
        washing_9kg_2Img.style.opacity = '0.5'; 
        washing_9kg_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B4 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B4'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


// Handle button click for soap button
function btn_ws_9kg3() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.washing_9kg_3');
        
        // Disable the button visually
        document.querySelector('.washing_9kg_3').style.backgroundColor = 'gray';
        const washing_9kg_3Img = document.querySelector('#washing_9kg_3');
        washing_9kg_3Img.style.opacity = '0.5'; 
        washing_9kg_3Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B5 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B5'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_ws_12kg1() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.washing_12kg_1');
        

        // Disable the button visually
        document.querySelector('.washing_12kg_1').style.backgroundColor = 'gray';
        const washing_12kg_1Img = document.querySelector('#washing_12kg_1');
        washing_12kg_1Img.style.opacity = '0.5'; 
        washing_12kg_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B6 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B6'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_ws_12kg2() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.washing_12kg_2');
        

        // Disable the button visually
        document.querySelector('.washing_12kg_2').style.backgroundColor = 'gray';
        const washing_12kg_2Img = document.querySelector('#washing_12kg_2');
        washing_12kg_2Img.style.opacity = '0.5'; 
        washing_12kg_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B7 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B7'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


// Handle button click for fabric button
function btn_dryer1() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.dryer_1');
        

        // Disable the button visually
        document.querySelector('.dryer_1').style.backgroundColor = 'gray';
        const dryer_1Img = document.querySelector('#dryer_1');
        dryer_1Img.style.opacity = '0.5'; 
        dryer_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B8 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B8'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_dryer2() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.dryer_2');
        

        // Disable the button visually
        document.querySelector('.dryer_2').style.backgroundColor = 'gray';
        const dryer_2Img = document.querySelector('#dryer_2');
        dryer_2Img.style.opacity = '0.5'; 
        dryer_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B9 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B9'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_ironing1() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.ironing_1');
        

        // Disable the button visually
        document.querySelector('.ironing_1').style.backgroundColor = 'gray';
        const ironing_1Img = document.querySelector('#ironing_1');
        ironing_1Img.style.opacity = '0.5'; 
        ironing_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B10 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B10'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_ironing2() {
    if (connection_status) {
       // Show the overlay
        showLoadingOverlay('.ironing_2');
        

        // Disable the button visually
        document.querySelector('.ironing_2').style.backgroundColor = 'gray';
        const ironing_2Img = document.querySelector('#ironing_2');
        ironing_2Img.style.opacity = '0.5'; 
        ironing_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B11 = 1; 
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B11'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}



