document.addEventListener("DOMContentLoaded", function() {
    // --- LISTA DE CIDADES PARA TODOS OS ESTADOS DO BRASIL ---
    const citiesByState = {
        'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
        'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo', 'Marechal Deodoro'],
        'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão'],
        'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Lauro de Freitas', 'Porto Seguro'],
        'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca'],
        'DF': ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Plano Piloto', 'Gama', 'Águas Claras', 'Guará'],
        'ES': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'Guarapari'],
        'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás'],
        'MA': ['São Luís', 'Imperatriz', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia'],
        'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Sorriso', 'Lucas do Rio Verde'],
        'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga'],
        'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal', 'Abaetetuba'],
        'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cabedelo'],
        'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'Foz do Iguaçu', 'São José dos Pinhais', 'Colombo'],
        'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Garanhuns'],
        'PI': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior'],
        'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'Campos dos Goytacazes', 'São João de Meriti', 'Petrópolis', 'Volta Redonda'],
        'RN': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'Passo Fundo'],
        'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Jaru'],
        'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Cantá', 'Mucajaí'],
        'SC': ['Joinville', 'Florianópolis', 'Blumenau', 'São José', 'Chapecó', 'Itajaí', 'Criciúma', 'Jaraguá do Sul', 'Lages'],
        'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Sorocaba', 'Ribeirão Preto', 'São José dos Campos', 'Jundiaí', 'Santos'],
        'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância', 'São Cristóvão'],
        'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
    };

    // Função para embaralhar uma lista (algoritmo de Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function fetchLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) {
                throw new Error('Não foi possível obter a localização.');
            }
            const data = await response.json();

            const userCity = data.city || 'sua cidade';
            const userState = data.region_code || 'seu estado'; // Ex: 'SP'
            const userCityAndState = `${userCity} - ${userState}`;

            let cityList = [];
            // Verifica se temos uma lista para o estado do usuário
            if (citiesByState[userState]) {
                cityList = [...citiesByState[userState]]; // Cria uma cópia da lista do estado
            }
            
            // Adiciona a cidade específica do usuário à lista (se ainda não estiver lá)
            if (userCity && !cityList.includes(userCity)) {
                cityList.push(userCity);
            }

            // Embaralha a lista e pega as 3 primeiras cidades
            const shuffledCities = shuffleArray(cityList);
            const displayCities = shuffledCities.slice(0, 3).join(', ');
            
            updateLocationText(userCityAndState, displayCities, userCity);

        } catch (error) {
            console.error("Erro ao buscar localização:", error);
            // Fallback: se a API falhar, usa textos padrão
            updateLocationText('sua cidade - seu estado', 'várias cidades do Brasil', 'sua cidade');
        }
    }

    function updateLocationText(fullLocation, cityListText, userCity) {
        // Atualiza a localização específica nos cards de perfil
        const profileLocationElements = document.querySelectorAll('.location-main');
        profileLocationElements.forEach(element => {
            element.textContent = fullLocation;
        });

        // Atualiza a lista de cidades no cabeçalho
        const headerLocationElements = document.querySelectorAll('.location-list');
        headerLocationElements.forEach(element => {
            element.textContent = cityListText;
        });

        // Atualiza a cidade específica no rodapé
        const footerLocationElements = document.querySelectorAll('.location-footer');
        footerLocationElements.forEach(element => {
            element.textContent = userCity;
        });
    }

    fetchLocation();
});
