// Globals
// HOST_NAME saved as variable in case the URL has to be reused later.
const HOST_NAME = 'https://codifyinditest.com/script_test';

// Handler for onc click event of close button
const removeWidget = () => {
  document.getElementById('call-widget').style.display = 'none';
};

// Function to fetch label and phone number from API call
const fetchWidgetContent = async () => {
  const url = `${HOST_NAME}/api-test/`;
  try {
    const response = await fetch(url);
    const body = await response.json();
    return body['script test'];
  } catch (error) {
    console.log(error.message);
    alert(`Failed to load widget. Please try reloading the page`);
  }
};

const renderWidget = (response) => {
  var {
    labels,
    phone_number,
    // There was an extra param called feature_img. The image size was too big and I wasn't sure where I could have used it.
    // feature_img
  } = response;

  // The host webpage needs to have a
  var placeholder = document.querySelector('div#call-widget');
  placeholder.innerHTML = `
    <p class="call-widget-label">${labels}</p>
    <p class="call-widget-number"> 
      &#9742; <a href="tel:'${phone_number}">${phone_number}</a>
    </p>
    <button onClick="removeWidget()" class="close-btn">&times;</button>`;
};

const renderStyles = () => {
  const headElement = document.getElementsByTagName('head')[0];
  // Generate and append styles to the head tag
  headElement.innerHTML += `<style>
      #call-widget {
        position: fixed;
        bottom: 120px;
        right: 60px;
        height: 60px;
        width: 320px;
        background: #343434;
        border-radius: 10px;
        padding:1rem 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      #call-widget:hover,
      #call-widget .close-btn:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
        cursor: pointer;
      }

      #call-widget .close-btn {
        outline: none;
        border: none;
        background: #cfcfcf;
        font-size: 1.5rem;
        line-height: 1.5rem;
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        padding: 0;
        position: absolute;
        bottom: -4rem;
        left: 276px;
        vertical-align: middle;
      }

      #call-widget p {
        text-align:center;
        line-height:1.5rem;
        margin:0;
        font-weight: bold;
      }

      #call-widget p.call-widget-label{
        color:#fff; 
        text-transform:uppercase;
      }

      #call-widget p.call-widget-number, #call-widget p.call-widget-number a{
        color:#39FF14;
        letter-spacing:2px;
      }
    </style>`;
};

// App execution starts here.
(async function() {
  // 1. Load API content for label and phone number
  const response = await fetchWidgetContent();
  // 2. Render CSS styles for widget
  renderStyles();
  // 3. Render the actual widget with loaded data
  renderWidget(response);
})();
