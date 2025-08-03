document.addEventListener("DOMContentLoaded", function() {
    // Função para buscar a localização e atualizar o HTML
    async function fetchLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) {
                throw new Error('Não foi possível obter a localização.');
            }
            const data = await response.json();
            const city = data.city || 'sua região';
            const region = data.region_code || 'seu estado';
            const cityAndState = `${city} - ${region}`;

            updateLocationText(cityAndState, city);

        } catch (error) {
            console.error("Erro ao buscar localização:", error);
            // Se falhar, usa um texto padrão
            updateLocationText('sua cidade - seu estado', 'sua cidade');
        }
    }

    // Função para atualizar todos os elementos de localização na página
    function updateLocationText(fullLocation, city) {
        const locationElements = document.querySelectorAll('.location');
        const locationTextElements = document.querySelectorAll('.location-text .location');

        // Atualiza as localizações gerais (ex: no cabeçalho e rodapé)
        locationElements.forEach(element => {
            // Verifica se o elemento está dentro de um .location-text para não sobrescrever
            if (!element.parentElement.classList.contains('location-text')) {
                 element.textContent = city;
            }
        });

        // Atualiza especificamente a localização nos cards de perfil
        locationTextElements.forEach(element => {
            element.textContent = fullLocation;
        });
    }

    // Chama a função para iniciar o processo
    fetchLocation();
});
