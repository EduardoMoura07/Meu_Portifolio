// =========================
// MODAL CONTATO
// =========================
// ===== MODAL CONTATO =====
const modalContato = document.getElementById('modalContato');
const abrirContato = document.getElementById('abrirContato');
const fecharModal = document.querySelector('.fechar');

abrirContato.addEventListener('click', () => {
    modalContato.style.display = 'flex';
});

fecharModal.addEventListener('click', () => {
    modalContato.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalContato) {
        modalContato.style.display = 'none';
    }
});

// ===== MODAL CERTIFICADO =====
const modalCertificado = document.getElementById('modalCertificado');
const imagemCertificado = document.getElementById('imagemCertificado');
const tituloCertificado = document.getElementById('tituloCertificado');
const fecharCertificado = document.querySelector('.fechar-certificado');
let urlCertificadoAtual = '';

// Função para abrir o certificado ampliado
function abrirCertificado(url, titulo) {
    // Verifica se a imagem existe antes de abrir
    const img = new Image();
    img.onload = function() {
        // Imagem carregou com sucesso
        urlCertificadoAtual = url;
        imagemCertificado.src = url;
        tituloCertificado.textContent = titulo || 'Certificado';
        modalCertificado.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Impede rolagem da página
    };
    img.onerror = function() {
        // Se a imagem não carregar, mostra mensagem de erro
        alert('Erro ao carregar a imagem. Verifique se o arquivo existe na pasta "imagens".');
        console.error('Imagem não encontrada:', url);
    };
    img.src = url;
}

// Fechar modal do certificado
fecharCertificado.addEventListener('click', () => {
    modalCertificado.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
    if (e.target === modalCertificado) {
        modalCertificado.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalCertificado.style.display === 'flex') {
            modalCertificado.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (modalContato.style.display === 'flex') {
            modalContato.style.display = 'none';
        }
    }
});

// ===== FUNÇÃO PARA BAIXAR CERTIFICADO =====
function baixarCertificado() {
    if (urlCertificadoAtual) {
        // Pega o nome do arquivo da URL
        const nomeArquivo = urlCertificadoAtual.split('/').pop();
        
        // Cria um link para download
        const link = document.createElement('a');
        link.href = urlCertificadoAtual;
        link.download = nomeArquivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback visual
        const btn = document.querySelector('.btn-download-cert');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Baixado!';
        setTimeout(() => {
            btn.innerHTML = textoOriginal;
        }, 2000);
    } else {
        alert('Nenhum certificado selecionado para download.');
    }
}

// ===== ANIMAÇÃO DE ENTRADA DOS CARDS =====
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // ===== VERIFICAR IMAGENS DOS CERTIFICADOS =====
    const imagens = document.querySelectorAll('.card-image img');
    imagens.forEach(img => {
        // Verifica se a imagem carregou
        img.addEventListener('error', function() {
            // Se a imagem não carregar, mostrar um placeholder
            this.style.display = 'none';
            const parent = this.parentElement;
            parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            parent.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; color: white; padding: 20px; text-align: center;">
                    <i class="fas fa-file-image" style="font-size: 48px; margin-bottom: 10px;"></i>
                    <span style="font-weight: 500;">Imagem não encontrada</span>
                    <span style="font-size: 0.8em; opacity: 0.7; margin-top: 5px;">${this.alt}</span>
                    <span style="font-size: 0.7em; opacity: 0.5; margin-top: 5px;">Coloque o arquivo na pasta "imagens"</span>
                </div>
            `;
            // Adiciona evento de clique no placeholder também
            parent.style.cursor = 'pointer';
            parent.onclick = function() {
                alert('Arquivo não encontrado. Verifique se o certificado está na pasta "imagens".');
            };
        });

        // Verifica se a imagem já está carregada
        if (img.complete) {
            // Se já carregou, não faz nada
        }
    });

    // ===== BOTÃO DE ROLAGEM SUAVE =====
    document.querySelectorAll('nav a, .btn-ver, .btn-download-cert').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    console.log('🚀 Portfólio Eduardo Moura carregado com sucesso!');
    console.log('📄 Certificados disponíveis:');
    document.querySelectorAll('.card-content h3').forEach((h3, index) => {
        console.log(`  ${index + 1}. ${h3.textContent}`);
    });
});

// ===== FUNÇÃO PARA TESTAR AS IMAGENS =====
function verificarImagens() {
    const imagens = document.querySelectorAll('.card-image img');
    let total = imagens.length;
    let carregadas = 0;
    let erro = 0;

    imagens.forEach(img => {
        const src = img.src;
        const teste = new Image();
        teste.onload = function() {
            carregadas++;
            console.log(`✅ Imagem carregada: ${src.split('/').pop()}`);
            if (carregadas + erro === total) {
                console.log(`📊 Status: ${carregadas}/${total} imagens carregadas, ${erro} com erro`);
            }
        };
        teste.onerror = function() {
            erro++;
            console.warn(`⚠️ Imagem não encontrada: ${src.split('/').pop()}`);
            if (carregadas + erro === total) {
                console.log(`📊 Status: ${carregadas}/${total} imagens carregadas, ${erro} com erro`);
            }
        };
        teste.src = src;
    });
}

// Executar verificação após 1 segundo
setTimeout(verificarImagens, 1000);