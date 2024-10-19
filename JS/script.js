// Global variable for timeout
let lastClickedButton = null; // Track the last clicked button
let hideOverlayTimeout;
var connection_status = false;
var client;

setTimeout(function() {
    ConnectToMQTT();
}, 1000);

function ConnectToMQTT() {
    const randomClientNumber = Math.floor(Math.random() * 1000) + 1;
    const clientID = 'Device_Id' + randomClientNumber; // Generate unique user name
    const host = 'blithesome-chiropractor.cloudmqtt.com';
    const port = 443;

    client = new Paho.MQTT.Client(host, Number(port), clientID);
    
    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client
    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        userName: 'rwufzabs',
        password: 'kVZNw5Tuj6e5',
        mqttVersion: 4
    });
}

// Function to subscribe to both topics and handle messages
function onConnect() {
    console.log("onConnect:");
    connection_status = true;

    // Subscribe to the touch topics
    const topic_Touch = 'touch';
    client.subscribe(topic_Touch); 

    console.log("Subscribed to topics: touch");
    
    // Subscribe to info topics
    const topic_Confirm = 'confirm';
    client.subscribe(topic_Confirm);

    // Subscribe to the breset
    const topic_Breset = 'breset';
    client.subscribe(topic_Breset);

    console.log("Subscribed to topics: touch, confirm, breset");
}



// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
        alert("MQTT Connection Lost");
    }
}



// -----------------------------------------------------------------------
// --- Function to show the loading overlay
// -----------------------------------------------------------------------
// Function to show the loading overlay
function showLoadingOverlay(buttonClass) {
    lastClickedButton = buttonClass; // Track the button that was clicked
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex'; // Show the overlay
    startOverlayTimer(); // Start the timer for hiding the overlay
}

// Function to hide the loading overlay and reset the clicked button
function hideLoadingOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; // Hide the overlay
    console.log('Overlay hidden'); // Debugging log

    if (connection_status) {
        // Update the button state (reset it to 0 for the clicked button)
        if (lastClickedButton === '.soap') {
            buttonStates.B1 = 0; // Reset the button state
        } else if (lastClickedButton === '.fabric') {
            buttonStates.B2 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_1') {
            buttonStates.B3 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_2') {
            buttonStates.B4 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_3') {
            buttonStates.B5 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_12kg_1') {
            buttonStates.B6 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_12kg_2') {
            buttonStates.B7 = 0; // Reset the button state
        } else if (lastClickedButton === '.dryer_1') {
            buttonStates.B8 = 0; // Reset the button state
        } else if (lastClickedButton === '.dryer_2') {
            buttonStates.B9 = 0; // Reset the button state
        } else if (lastClickedButton === '.ironing_1') {
            buttonStates.B10 = 0; // Reset the button state
        } else if (lastClickedButton === '.ironing_2') {
            buttonStates.B11 = 0; // Reset the button state
        }


        publishTouch(true); // Publish to MQTT with retain flag
    }
}

// Function to start the 30-second timeout for hiding the overlay
function startOverlayTimer() {
    clearTimeout(hideOverlayTimeout); // Clear any existing timeout
    hideOverlayTimeout = setTimeout(hideLoadingOverlay, 40000); // Set a 30-second timeout to hide the overlay
    console.log('30-second timer started'); // Debugging log
}

// Function to cancel the overlay timeout if a message arrives
function cancelOverlayTimer() {
    clearTimeout(hideOverlayTimeout); // Stop the 30-second timeout
    console.log('Overlay timer canceled'); // Debugging log
}







// MQTT callback when a retained message is received
function onMessageArrived(message) {

    // -----------------------------------------------------------------------
    // --- DISABLE
    // -----------------------------------------------------------------------
    if (message.destinationName === 'touch') {
        // Parse the retained button states
        const buttonStateArray = message.payloadString.split(','); // Example message: "B1=1, B2=0, ..."
        
        // Update the button states based on the retained message
        buttonStateArray.forEach(state => {
            const [button, value] = state.trim().split('=');
            buttonStates[button] = parseInt(value); // Store the button state
        });

        // ---- MACHINE SOAP
        if (buttonStates.B1 === 1) {
            document.querySelector('.soap').style.backgroundColor = 'gray';
            document.querySelector('#soap').style.opacity = '0.5';
            document.querySelector('#soap').style.pointerEvents = 'none';
        }   

        // ---- MACHINE FABRIC
        if (buttonStates.B2 === 1) {
            document.querySelector('.fabric').style.backgroundColor = 'gray';
            document.querySelector('#fabric').style.opacity = '0.5';
            document.querySelector('#fabric').style.pointerEvents = 'none';
        }

        // ---- MACHINE WASHING 9KG 1
        if (buttonStates.B3 === 1) {
            document.querySelector('.washing_9kg_1').style.backgroundColor = 'gray';
            document.querySelector('#washing_9kg_1').style.opacity = '0.5';
            document.querySelector('#washing_9kg_1').style.pointerEvents = 'none';
        }

        // ---- MACHINE WASHING 9KG 2
        if (buttonStates.B4 === 1) {
            document.querySelector('.washing_9kg_2').style.backgroundColor = 'gray';
            document.querySelector('#washing_9kg_2').style.opacity = '0.5';
            document.querySelector('#washing_9kg_2').style.pointerEvents = 'none';
        }

        // ---- MACHINE WASHING 9KG 3
        if (buttonStates.B5 === 1) {
            document.querySelector('.washing_9kg_3').style.backgroundColor = 'gray';
            document.querySelector('#washing_9kg_3').style.opacity = '0.5';
            document.querySelector('#washing_9kg_3').style.pointerEvents = 'none';
        }

        // ---- MACHINE WASHING 12KG 1
        if (buttonStates.B6 === 1) {
            document.querySelector('.washing_12kg_1').style.backgroundColor = 'gray';
            document.querySelector('#washing_12kg_1').style.opacity = '0.5';
            document.querySelector('#washing_12kg_1').style.pointerEvents = 'none';
        }


        // ---- MACHINE WASHING 12KG 2
        if (buttonStates.B7 === 1) {
            document.querySelector('.washing_12kg_2').style.backgroundColor = 'gray';
            document.querySelector('#washing_12kg_2').style.opacity = '0.5';
            document.querySelector('#washing_12kg_2').style.pointerEvents = 'none';
        }

        // ---- MACHINE DRYER 1
        if (buttonStates.B8 === 1) {
            document.querySelector('.dryer_1').style.backgroundColor = 'gray';
            document.querySelector('#dryer_1').style.opacity = '0.5';
            document.querySelector('#dryer_1').style.pointerEvents = 'none';
        }

        // ---- MACHINE DRYER 2
        if (buttonStates.B9 === 1) {
            document.querySelector('.dryer_2').style.backgroundColor = 'gray';
            document.querySelector('#dryer_2').style.opacity = '0.5';
            document.querySelector('#dryer_2').style.pointerEvents = 'none';
        }

        // ---- MACHINE IRONNING 1
        if (buttonStates.B10 === 1) {
            document.querySelector('.ironing_1').style.backgroundColor = 'gray';
            document.querySelector('#ironing_1').style.opacity = '0.5';
            document.querySelector('#ironing_1').style.pointerEvents = 'none';
        }

        // ---- MACHINE IRONNING 2
        if (buttonStates.B11 === 1) {
            document.querySelector('.ironing_2').style.backgroundColor = 'gray';
            document.querySelector('#ironing_2').style.opacity = '0.5';
            document.querySelector('#ironing_2').style.pointerEvents = 'none';
        }
    }


    // -----------------------------------------------------------------------
    // --- PAYMENT
    // -----------------------------------------------------------------------
    if (message.destinationName === 'confirm') {
        // Cancel the hide overlay timeout
        cancelOverlayTimer(); 

        // Message format: "B1=1,Device_Name=Device_Id460" or similar
        const [button_info, device_info] = message.payloadString.split(',');
        
        // Extract device name (ID)
        const device_name = device_info ? device_info.split('=')[1].trim() : ''; // Extract device name (e.g., "Device_Id460")
        
        // Extract button info (e.g., "B1=1")
        const [button, state] = button_info.trim().split('=');
        const buttonState = parseInt(state); // Convert to integer (0 or 1)

        
        // ---- MACHINE SOAP
        if (button === 'BB1' && buttonState === 1 && device_name === client.clientId) {

            document.querySelector('#de_soap1').innerHTML = 'ម៉ាស៊ីនរវល់';   // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link

        }    

        // ---- MACHINE FABRIC
        if (button === 'BB2' && buttonState === 1 && device_name === client.clientId) {
            
            document.querySelector('#de_fabric1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE WASHING 9KG 1
        if (button === 'BB3' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_wash9kg1').innerHTML = 'ម៉ាស៊ីនរវល់';    // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE WASHING 9KG 2
        if (button === 'BB4' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_wash9kg2').innerHTML = 'ម៉ាស៊ីនរវល់';    // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }     

        // ---- MACHINE WASHING 9KG 3
        if (button === 'BB5' && buttonState === 1 && device_name === client.clientId) {
            
            document.querySelector('#de_wash9kg3').innerHTML = 'ម៉ាស៊ីនរវល់';    // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE WASHING 12KG 1
        if (button === 'BB6' && buttonState === 1 && device_name === client.clientId) {
            
            document.querySelector('#de_wash12kg1').innerHTML = 'ម៉ាស៊ីនរវល់';   // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    


        // ---- MACHINE WASHING 12KG 1
        if (button === 'BB7' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_wash12kg2').innerHTML = 'ម៉ាស៊ីនរវល់';   // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE DRYER 1
        if (button === 'BB8' && buttonState === 1 && device_name === client.clientId) {
            
            document.querySelector('#de_dryer1').innerHTML = 'ម៉ាស៊ីនរវល់';  // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE DRYER 2
        if (button === 'BB9' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_dryer2').innerHTML = 'ម៉ាស៊ីនរវល់';  // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE IRONNING 1
        if (button === 'BB10' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_ironing1').innerHTML = 'ម៉ាស៊ីនរវល់';    // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    

        // ---- MACHINE IRONNING 2
        if (button === 'BB11' && buttonState === 1 && device_name === client.clientId) {
           
            document.querySelector('#de_ironing2').innerHTML = 'ម៉ាស៊ីនរវល់';    // Machine is busy (in Khmer) 
            window.location.href = 'https://link.payway.com.kh/ABAPAYwU302205p';    // Redirect to the specified link
        }    
        // Add similar logic for other buttons as needed...
    }





    // -----------------------------------------------------------------------
    // --- RESET BUTTON
    // -----------------------------------------------------------------------
    if (message.destinationName === 'breset') {
        // Message format: "Button=1" or "Button=2" or "Button=3", etc.
        const button_info = message.payloadString.split(','); // e.g., "Button=1"
    
        // Loop through the button info (if multiple messages are sent together)
        button_info.forEach(info => {
            // Extract button info (e.g., "Button=1")
            const [button, state] = info.trim().split('='); // Split into button and state
            const buttonState = parseInt(state); // Convert to integer (button number)
    
            // Check which button was clicked and update the UI accordingly
            switch (buttonState) {
                case 1:
                    // Update UI for soap button
                    document.querySelector('.soap').style.backgroundColor = '';
                    document.querySelector('#soap').style.opacity = '';
                    document.querySelector('#soap').style.pointerEvents = '';
                    break;
    
                case 2:
                    // Update UI for fabric button
                    document.querySelector('.fabric').style.backgroundColor = '';
                    document.querySelector('#fabric').style.opacity = '';
                    document.querySelector('#fabric').style.pointerEvents = '';
                    break;
    
                case 3:
                    // Update UI for washing 9kg machine
                    document.querySelector('.washing_9kg_1').style.backgroundColor = '';
                    document.querySelector('#washing_9kg_1').style.opacity = '';
                    document.querySelector('#washing_9kg_1').style.pointerEvents = '';
                    break;
    
                case 4:
                    // Update UI for washing 9kg machine
                    document.querySelector('.washing_9kg_2').style.backgroundColor = '';
                    document.querySelector('#washing_9kg_2').style.opacity = '';
                    document.querySelector('#washing_9kg_2').style.pointerEvents = '';
                    break;
    
                case 5:
                    // Update UI for washing 9kg machine
                    document.querySelector('.washing_9kg_3').style.backgroundColor = '';
                    document.querySelector('#washing_9kg_3').style.opacity = '';
                    document.querySelector('#washing_9kg_3').style.pointerEvents = '';
                    break;
    
                case 6:
                    // Update UI for washing 9kg machine
                    document.querySelector('.washing_12kg_1').style.backgroundColor = '';
                    document.querySelector('#washing_12kg_1').style.opacity = '';
                    document.querySelector('#washing_12kg_1').style.pointerEvents = '';
                    break;
                
    
                case 7:
                    // Update UI for washing 9kg machine
                    document.querySelector('.washing_12kg_2').style.backgroundColor = '';
                    document.querySelector('#washing_12kg_2').style.opacity = '';
                    document.querySelector('#washing_12kg_2').style.pointerEvents = '';
                    break;
    
                case 8:
                    // Update UI for washing 9kg machine
                    document.querySelector('.dryer_1').style.backgroundColor = '';
                    document.querySelector('#dryer_1').style.opacity = '';
                    document.querySelector('#dryer_1').style.pointerEvents = '';
                    break;
    
                case 9:
                    // Update UI for washing 9kg machine
                    document.querySelector('.dryer_2').style.backgroundColor = '';
                    document.querySelector('#dryer_2').style.opacity = '';
                    document.querySelector('#dryer_2').style.pointerEvents = '';
                    break;
    
                case 10:
                    // Update UI for washing 9kg machine
                    document.querySelector('.ironing_1').style.backgroundColor = '';
                    document.querySelector('#ironing_1').style.opacity = '';
                    document.querySelector('#ironing_1').style.pointerEvents = '';
                    break;
    
                case 11:
                    // Update UI for washing 9kg machine
                    document.querySelector('.ironing_2').style.backgroundColor = '';
                    document.querySelector('#ironing_2').style.opacity = '';
                    document.querySelector('#ironing_2').style.pointerEvents = '';
                    break;
                
                
                default:
                    console.log("Unknown button state received: " + buttonState);
            }
        });
    }
    



    
}









