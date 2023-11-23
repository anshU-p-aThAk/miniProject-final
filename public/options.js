document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const resultDiv = document.getElementById('result');
    const correctAnswer = '<%- ans %>'; // Assuming you pass correctAns to the template
    alert(correctAnswer);

    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('click', (event) => {
            const selectedOption = event.target.value;

            if (selectedOption === correctAnswer) {
                displayResult('Correct!');
            } else {
                displayResult('Wrong!');
            }
        });
    });

    function displayResult(result) {
        resultDiv.textContent = result;
    }
});
