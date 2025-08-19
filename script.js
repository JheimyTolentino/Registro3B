 document.addEventListener('DOMContentLoaded', function() {
            const loginBtn = document.getElementById('login-btn');
            const backBtn = document.getElementById('back-btn');
            const submitBtn = document.getElementById('submit-btn');
            const loginPage = document.getElementById('login-page');
            const evaluationPage = document.getElementById('evaluation-page');
            const ratingInputs = document.querySelectorAll('input[name="rating"]');
            const ratingText = document.getElementById('rating-text');
            const ratingMessage = document.getElementById('rating-message');
            const textarea = document.querySelector('textarea');
            const usernameInput = document.getElementById('username');
            const courseSelect = document.getElementById('course');
            const courseError = document.getElementById('course-error');
            const ratingContainer = document.querySelector('.rating');
            
            // Lista de cursos válidos
            const validCourses = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '4E'];
            
            // Mensajes según la calificación
            const ratingMessages = {
                1: "Muy mala experiencia",
                2: "Experiencia regular",
                3: "Experiencia aceptable",
                4: "Buena experiencia",
                5: "¡Excelente experiencia!"
            };
            
            // Alertas según la calificación
            const ratingAlerts = {
                1: "Lamentamos que tu experiencia no haya sido buena. ¿Podrías contarnos más en los comentarios para mejorar?",
                2: "Agradecemos tu feedback. Nos esforzaremos para mejorar.",
                3: "Gracias por tu evaluación. Seguiremos trabajando para mejorar.",
                4: "¡Nos alegra que hayas tenido una buena experiencia!",
                5: "¡Excelente! Nos encanta saber que tuviste una experiencia maravillosa."
            };
            
            // Actualizar texto de calificación
            function updateRatingText() {
                let selectedRating = 0;
                for (const radio of ratingInputs) {
                    if (radio.checked) {
                        selectedRating = radio.value;
                        break;
                    }
                }
                
                if (selectedRating > 0) {
                    ratingText.textContent = `Calificación: ${selectedRating}/5`;
                    ratingMessage.textContent = ratingMessages[selectedRating];
                } else {
                    ratingText.textContent = "Selecciona una calificación";
                    ratingMessage.textContent = "";
                }
            }
            
            // Habilitar/deshabilitar botón de ingreso
            function toggleLoginButton() {
                const username = usernameInput.value.trim();
                const course = courseSelect.value;
                
                if (username && validCourses.includes(course)) {
                    loginBtn.disabled = false;
                } else {
                    loginBtn.disabled = true;
                }
            }
            
            // Validar curso
            function validateCourse() {
                const course = courseSelect.value;
                
                if (course && !validCourses.includes(course)) {
                    courseError.style.display = 'block';
                    loginBtn.disabled = true;
                } else {
                    courseError.style.display = 'none';
                    toggleLoginButton();
                }
            }
            
            // Event listeners para validación en tiempo real
            usernameInput.addEventListener('input', toggleLoginButton);
            courseSelect.addEventListener('change', function() {
                validateCourse();
                toggleLoginButton();
            });
            
            // Event listeners para las estrellas
            ratingInputs.forEach(input => {
                input.addEventListener('change', updateRatingText);
            });
            
            // Mejorar la experiencia de hover para las estrellas
            const starLabels = document.querySelectorAll('.rating label');
            starLabels.forEach((label, index) => {
                label.addEventListener('mouseover', function() {
                    // Colorear todas las estrellas hasta esta
                    for (let i = 0; i <= index; i++) {
                        starLabels[i].style.color = '#ffc107';
                    }
                    // Descolorear las estrellas después de esta
                    for (let i = index + 1; i < starLabels.length; i++) {
                        starLabels[i].style.color = '#ddd';
                    }
                });
                
                label.addEventListener('mouseout', function() {
                    // Restaurar colores según selección actual
                    const selectedIndex = getSelectedIndex();
                    if (selectedIndex >= 0) {
                        for (let i = 0; i < starLabels.length; i++) {
                            starLabels[i].style.color = i <= selectedIndex ? '#ffc107' : '#ddd';
                        }
                    } else {
                        for (let i = 0; i < starLabels.length; i++) {
                            starLabels[i].style.color = '#ddd';
                        }
                    }
                });
            });
            
            // Obtener índice de la estrella seleccionada
            function getSelectedIndex() {
                for (let i = 0; i < ratingInputs.length; i++) {
                    if (ratingInputs[i].checked) {
                        return i;
                    }
                }
                return -1;
            }
            
            // Función para ingresar (mostrar evaluación)
            loginBtn.addEventListener('click', function() {
                const username = usernameInput.value.trim();
                const course = courseSelect.value;
                
                if (!username || !validCourses.includes(course)) {
                    alert('Por favor, ingresa un usuario y selecciona un curso válido');
                    return;
                }
                
                // Ocultar login y mostrar evaluación
                loginPage.style.display = 'none';
                evaluationPage.style.display = 'block';
            });
            
            // Volver a la página de login
            backBtn.addEventListener('click', function() {
                evaluationPage.style.display = 'none';
                loginPage.style.display = 'block';
            });
            
            // Enviar evaluación
            submitBtn.addEventListener('click', function() {
                let selectedRating = 0;
                for (const radio of ratingInputs) {
                    if (radio.checked) {
                        selectedRating = radio.value;
                        break;
                    }
                }
                
                if (selectedRating === 0) {
                    alert('Por favor, selecciona una calificación antes de enviar.');
                    return;
                }
                
                // Mostrar alerta según la calificación seleccionada
                alert(ratingAlerts[selectedRating]);
                
                // Reset form
                for (const radio of ratingInputs) {
                    radio.checked = false;
                }
                textarea.value = '';
                ratingText.textContent = "Selecciona una calificación";
                ratingMessage.textContent = "";
                
                // Restablecer colores de estrellas
                starLabels.forEach(label => {
                    label.style.color = '#ddd';
                });
            });
        });