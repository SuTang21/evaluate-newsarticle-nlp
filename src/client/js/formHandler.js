function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value; 

    console.log(`This is the input: ${formText.length}`);

    const postData = async (url = '', data = {})=>{
        const response = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data), 
        });
      
        try {
          const newData = await response.json();
          console.log(`This is the new data agreement value: ${newData.agreement}`);
          return newData;
        }catch(error) {
          console.log("error", error);
        }
      }

    const updateUI = (heading, result, parent) => {
        const label = document.createElement('p');
        label.textContent = `${heading}`;

        const results = document.createElement('p');
        results.textContent = `${result}`;

        parent.appendChild(label);
        parent.appendChild(results);
    }

    if(formText.length > 0){
        console.log("::: Form Submitted :::");
        console.log(typeof formText);

        const results = [];

        postData('http://localhost:8080/sentiment-analysis', {text: formText}).then((data) => {
            console.log(`This is the input: ${formText}`);

            results.push(data.agreement);
            results.push(data.confidence);
            results.push(data.sentence_list[0].text);

            const newDiv = document.createElement('div');

            if(results.length > 0){
                updateUI('Agreement: ', results[0], newDiv);
                updateUI('Confidence: ', results[1], newDiv);
                updateUI('Input: ', results[2], newDiv);
        
                document.getElementById('results').appendChild(newDiv);
            }
        });
    } else {
        const newDiv = document.createElement('div');
        const parent = document.getElementById('form1');

        newDiv.classList.add('error');
        newDiv.textContent = `Text input required.`;

        console.log(newDiv);

        parent.after(newDiv);
    }
}

export { handleSubmit }