// PowerFit Academia - Script Principal

// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIÁVEIS GLOBAIS =====
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    
    // ===== FUNÇÕES =====
    
    // Função para verificar o scroll da página
    function checkScroll() {
        // Adicionar classe ao header quando rolar a página
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }
        
        // Atualizar link ativo no menu baseado na seção visível
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Função para animar elementos quando entrarem na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Função para alternar o menu mobile
    function toggleMenu() {
        navMenu.classList.toggle('active');
        
        // Alternar ícone do menu
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Função para fechar o menu ao clicar em um link
    function closeMenuOnClick() {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Função para rolagem suave ao clicar em links de âncora
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                closeMenuOnClick();
            }
        }
    }
    
    // ===== SLIDER DE INSTRUTORES =====
    const instrutoresSlider = document.querySelector('.instrutores-slider');
    const instrutorCards = document.querySelectorAll('.instrutor-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideWidth = 0;
    let slidesToShow = 4;
    
    // Função para atualizar o número de slides a mostrar baseado no tamanho da tela
    function updateSlidesToShow() {
        if (window.innerWidth < 576) {
            slidesToShow = 1;
        } else if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 992) {
            slidesToShow = 2;
        } else if (window.innerWidth < 1200) {
            slidesToShow = 3;
        } else {
            slidesToShow = 4;
        }
        
        // Atualizar largura do slide
        slideWidth = instrutoresSlider.clientWidth / slidesToShow;
        
        // Atualizar largura dos cards
        instrutorCards.forEach(card => {
            card.style.flex = `0 0 ${slideWidth}px`;
        });
        
        // Resetar posição do slider
        currentSlide = 0;
        updateSliderPosition();
    }
    
    // Função para atualizar a posição do slider
    function updateSliderPosition() {
        const maxSlide = instrutorCards.length - slidesToShow;
        
        // Garantir que currentSlide não seja menor que 0 ou maior que maxSlide
        if (currentSlide < 0) {
            currentSlide = 0;
        } else if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        
        // Mover o slider
        instrutoresSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Atualizar estado dos botões
        if (currentSlide === 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        if (currentSlide >= maxSlide) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }
    
    // ===== SLIDER DE DEPOIMENTOS =====
    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    const depoimentoCards = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    
    let currentDepoimento = 0;
    
    // Função para mostrar o depoimento atual
    function showDepoimento(index) {
        // Garantir que o índice esteja dentro dos limites
        if (index < 0) {
            index = depoimentoCards.length - 1;
        } else if (index >= depoimentoCards.length) {
            index = 0;
        }
        
        currentDepoimento = index;
        
        // Esconder todos os depoimentos
        depoimentoCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Remover classe active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar o depoimento atual
        depoimentoCards[currentDepoimento].style.display = 'block';
        
        // Adicionar classe active ao dot atual
        dots[currentDepoimento].classList.add('active');
    }
    
    // Função para avançar para o próximo depoimento automaticamente
    function autoAdvanceDepoimento() {
        showDepoimento(currentDepoimento + 1);
    }
    
    // Iniciar o intervalo para avançar automaticamente
    let depoimentoInterval = setInterval(autoAdvanceDepoimento, 5000);
    
    // ===== FILTRO DE GALERIA =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    // Função para filtrar itens da galeria
    function filterGaleria(filter) {
        galeriaItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // ===== MODAL DE GALERIA =====
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentModalImg = 0;
    const modalImages = [];
    
    // Função para abrir o modal
    function openModal(index) {
        modal.classList.add('active');
        currentModalImg = index;
        updateModalContent();
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o modal
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Função para atualizar o conteúdo do modal
    function updateModalContent() {
        // Aqui seria onde carregaríamos a imagem real
        // Como estamos usando placeholders, vamos apenas atualizar a legenda
        modalCaption.textContent = modalImages[currentModalImg].caption;
    }
    
    // Função para navegar para a imagem anterior no modal
    function prevModalImg() {
        currentModalImg--;
        if (currentModalImg < 0) {
            currentModalImg = modalImages.length - 1;
        }
        updateModalContent();
    }
    
    // Função para navegar para a próxima imagem no modal
    function nextModalImg() {
        currentModalImg++;
        if (currentModalImg >= modalImages.length) {
            currentModalImg = 0;
        }
        updateModalContent();
    }
    
    // ===== VALIDAÇÃO DE FORMULÁRIO =====
    const contactForm = document.getElementById('form-contato');
    
    // Função para validar o formulário
    function validateForm(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        let isValid = true;
        
        // Validar nome
        if (nome.trim() === '') {
            showError('nome', 'Por favor, insira seu nome');
            isValid = false;
        } else {
            removeError('nome');
        }
        
        // Validar email
        if (email.trim() === '') {
            showError('email', 'Por favor, insira seu email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Por favor, insira um email válido');
            isValid = false;
        } else {
            removeError('email');
        }
        
        // Validar assunto
        if (assunto === '' || assunto === null) {
            showError('assunto', 'Por favor, selecione um assunto');
            isValid = false;
        } else {
            removeError('assunto');
        }
        
        // Validar mensagem
        if (mensagem.trim() === '') {
            showError('mensagem', 'Por favor, insira sua mensagem');
            isValid = false;
        } else {
            removeError('mensagem');
        }
        
        // Se o formulário for válido, enviar
        if (isValid) {
            // Aqui seria onde enviaríamos o formulário
            // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        }
    }
    
    // Função para mostrar erro
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remover mensagem de erro existente
        removeError(inputId);
        
        // Adicionar classe de erro ao input
        input.classList.add('error');
        
        // Adicionar mensagem de erro após o input
        input.parentNode.appendChild(errorDiv);
    }
    
    // Função para remover erro
    function removeError(inputId) {
        const input = document.getElementById(inputId);
        const errorDiv = input.parentNode.querySelector('.error-message');
        
        // Remover classe de erro do input
        input.classList.remove('error');
        
        // Remover mensagem de erro se existir
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Função para validar e enviar newsletter
    function submitNewsletter(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email.trim() === '') {
            alert('Por favor, insira seu email');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido');
            return;
        }
        
        // Aqui seria onde enviaríamos o email para a newsletter
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        alert('Inscrição realizada com sucesso!');
        newsletterForm.reset();
    }
    
    // ===== INICIALIZAÇÃO =====
    
    // Adicionar classe para animação em elementos
    function initAnimations() {
        // Adicionar classe animate-on-scroll a elementos que devem ser animados
        document.querySelectorAll('.servico-card, .plano-card, .instrutor-card, .galeria-item, .info-item').forEach(el => {
            el.classList.add('animate-on-scroll');
        });
        
        // Verificar elementos visíveis inicialmente
        animateOnScroll();
    }
    
    // Inicializar slider de instrutores
    function initInstrutoresSlider() {
        updateSlidesToShow();
        
        // Event listeners para botões do slider
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            updateSliderPosition();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            updateSliderPosition();
        });
        
        // Atualizar slider quando a janela for redimensionada
        window.addEventListener('resize', () => {
            updateSlidesToShow();
        });
    }
    
    // Inicializar slider de depoimentos
    function initDepoimentosSlider() {
        // Mostrar o primeiro depoimento
        showDepoimento(0);
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showDepoimento(index);
                clearInterval(depoimentoInterval);
                depoimentoInterval = setInterval(autoAdvanceDepoimento, 5000);
            });
        });
    }
    
    // Inicializar filtro de galeria
    function initGaleriaFilter() {
        // Event listeners para botões de filtro
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Adicionar classe active ao botão clicado
                btn.classList.add('active');
                
                // Filtrar itens
                const filter = btn.getAttribute('data-filter');
                filterGaleria(filter);
            });
        });
    }
    
    // Inicializar modal de galeria
    function initGaleriaModal() {
        // Criar array de objetos de imagem
        galeriaItems.forEach((item, index) => {
            const caption = item.querySelector('.galeria-info h3').textContent;
            modalImages.push({
                src: '', // Aqui seria o src da imagem real
                caption: caption
            });
            
            // Event listener para abrir modal
            item.querySelector('.galeria-icon').addEventListener('click', (e) => {
                e.preventDefault();
                openModal(index);
            });
        });
        
        // Event listeners para navegação do modal
        closeModal.addEventListener('click', closeModalFunc);
        modalPrev.addEventListener('click', prevModalImg);
        modalNext.addEventListener('click', nextModalImg);
        
        // Fechar modal ao clicar fora do conteúdo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
        
        // Fechar modal com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModalFunc();
            }
        });
    }
    
    // Inicializar validação de formulário
    function initFormValidation() {
        if (contactForm) {
            contactForm.addEventListener('submit', validateForm);
        }
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', submitNewsletter);
        }
    }
    
    // Função principal de inicialização
    function init() {
        // Event listeners para scroll
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // Event listener para menu toggle
        menuToggle.addEventListener('click', toggleMenu);
        
        // Event listeners para links de navegação
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Event listener para botão back to top
        backToTopBtn.addEventListener('click', smoothScroll);
        
        // Inicializar componentes
        initAnimations();
        initInstrutoresSlider();
        initDepoimentosSlider();
        initGaleriaFilter();
        initGaleriaModal();
        initFormValidation();
        
        // Verificar scroll inicial
        checkScroll();
    }
    
    // Iniciar
    init();
});

// Adicionar estilos CSS para mensagens de erro
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .error {
            border-color: #ff4d4d !important;
            box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.3) !important;
        }
        
        .error-message {
            color: #ff4d4d;
            font-size: 0.75rem;
            margin-top: 5px;
            font-weight: 500;
        }
        
        .disabled {
            opacity: 0.5;
            cursor: not-allowed !important;
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);
