document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    
    // Add sparkle effect on button click
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
        `;
        document.body.appendChild(sparkle);
        
        // Animate and remove
        sparkle.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => sparkle.remove();
    }

    // Add click sound effect
    function playClickSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1QTDMhDxgZNjg6P0RWcn6FmZSWmZ6Wk4xza2BXSz0zKRwlIyUlJSMjIyAZFAwKCQcHCgoQExohIiUnLC4zNDs+Qi8oHhQNCwkGBQcJEBYcISMoLDI3Oz9DRkpNUVVYXF9iZGZoamxub3BwcXFycnNzdHR1dXZ2d3d4eHl5enp7e3x8fX1+fn9/f4CAgYGCgoODg4SEhYWGhoeHiIiJiYqKioqLi4yMjY2Ojo+PkJCQkZGSkpOTlJSVlZaWl5eYmJmZmpqbm5ycnZ2enp+foKChoqKjo6SkpaWmpqenqKipqaqqq6usrK2tra6ur6+wsLGxsrKzs7S0tbW2tre3uLi5uam4h4F1eHN1cm9raGViXVhTTkpFQj46OzUyLCgjGxYTCwsNDA8PExYYHSEiKiwyNTs+QkZLTVBRVFZXWVpcXmBhY2VmaGprbW5wcXJzdHV2d3h5enpgYU5ANSsoIBwYExAMCQYEAgEBAgQHCg0RFRkcICQnKy4xNDc6NT84QkdHPzc4NyoXCAQBAQIECQ8aJy45PE1ih5aSm5eZkZadoqewub7Dxc3X1dfT2dXR1sjcwLWwpp6Wj4d/d29nX1hRSkM8NTAsJiAaFRALBwQBAQEDBQgMEBQYHCAkKCwvMzY5PUBERkhLTlFUV1lcX2JiYF9eXFtZWFZVU1JQT01MSklHRkVDQkFAPz49PDo5ODY1MzIwLy0sKikoJyYkIyEgHx4cGxoYFxYUExEQDw4MCwoIBwYEAwIBAQECAwQGBwkLDA4QERMUFhcZGhwdHyAiIyUmKCkrLC4vMTIzNTY4OTo8PT9AQkNFRkdJSktNTk9RUlRVV1haW11eYGFjZGZnaWpsbm9xcnR1d3h6e3x+f4GCg4WHiImLjI2PkJKTlJaXmZqcnZ+goqOlpqipq6yur7Gys7W2t7m6vL2/wMLDxcbIycvMzs/R0tTV19jZ29zd39/d3Nva2dfW1NPS0M/NzMrJx8bEw8HAvr27urm3trSzsrCvraunpqSjoaCenZuamJeVlJKRj46MCwYHBQUHBwsNERYdJCkvMjc8QERHTkxTWGBpb25vb3JydXR1c25mYmBbVk9LSEY3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
        audio.volume = 0.2;
        audio.play();
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click effects
            playClickSound();
            const rect = button.getBoundingClientRect();
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createSparkle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }

            const value = button.dataset.value;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operation = null;
                display.value = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        previousInput = calculate();
                        display.value = previousInput;
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                }
                operation = value;
            } else if (value === '=') {
                if (currentInput !== '' && previousInput !== '') {
                    currentInput = calculate();
                    display.value = currentInput;
                    previousInput = '';
                    operation = null;
                }
            }
        });
    });

    function calculate() {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch(operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return '';
        }

        return result.toString();
    }
});