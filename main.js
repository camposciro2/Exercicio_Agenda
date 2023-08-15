document.addEventListener("DOMContentLoaded", function () {

    function formatarTelefone() {
        const telefoneInput = document.getElementById("telefone");
        telefoneInput.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, '');
            this.value = value.length <= 10
                ? value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
                : value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        });
    }

    let numeroContato = 1;

    function adicionarContatoATabela(nomeCompleto, telefone) {
        const tabela = document.querySelector("table tbody");
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td><input type="checkbox" class="contact-checkbox"></td>
            <td></td>  <!-- Removemos o ${numeroContato} daqui -->
            <td>${nomeCompleto}</td>
            <td>${telefone}</td>
        `;
        tabela.appendChild(novaLinha);
        // numeroContato++;  <-- Removemos esta linha
        adicionarEventosCheckbox();
        renumerarContatos();
    }

    function renumerarContatos() {
        const tabela = document.querySelector("table tbody");
        const linhas = tabela.rows;
        let contatoRealIndex = 1;

        for (let i = 0; i < linhas.length; i++) {
            if (linhas[i].cells[2].textContent == "----") {
                linhas[i].cells[1].textContent = 0; // se a linha tem "----", ela se torna 0
            } else {
                linhas[i].cells[1].textContent = contatoRealIndex++;
            }
        }
    }

    function buscarContato(query) {
        const tabela = document.querySelector("table tbody");
        const linhas = tabela.rows;

        for (let i = 0; i < linhas.length; i++) {
            const nomeCompleto = linhas[i].cells[2].textContent.toLowerCase();
            const checkbox = linhas[i].querySelector(".contact-checkbox");

            if (nomeCompleto.includes(query.toLowerCase())) {
                linhas[i].classList.add('highlight');
                checkbox.checked = true; // Marca a caixa de seleção
            } else {
                linhas[i].classList.remove('highlight');
                checkbox.checked = false; // Desmarca a caixa de seleção
            }
        }
    }

    function adicionarEventosCheckbox() {
        const checkboxes = document.querySelectorAll(".contact-checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function () {
                const linha = this.parentElement.parentElement;
                if (this.checked) {
                    linha.classList.add("column-highlight");
                } else {
                    linha.classList.remove("column-highlight", "highlight");
                }
            });
        });
    }

    const nomeInput = document.getElementById("nome");
    const sobrenomeInput = document.getElementById("sobrenome");
    const telefoneInput = document.getElementById("telefone");

    const btnEdit = document.getElementById("btnEdit");
    btnEdit.addEventListener("click", function () {
        const linhasSelecionadas = document.querySelectorAll("table tbody tr.column-highlight");
        if (linhasSelecionadas.length === 1) {
            const linha = linhasSelecionadas[0];
            const nomeCompleto = linha.cells[2].textContent;
            const nomeSobrenome = nomeCompleto.split(" ");
            nomeInput.value = nomeSobrenome[0];
            sobrenomeInput.value = nomeSobrenome.slice(1).join(" ");
            telefoneInput.value = linha.cells[3].textContent;
            linha.remove();
            adicionarEventosCheckbox();
        }
    });

    const btnSearch = document.getElementById("btnSearch");
    btnSearch.addEventListener("click", function () {
        const query = document.getElementById("search").value;
        buscarContato(query);
        adicionarEventosCheckbox();
    });

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", function () {
        const tabela = document.querySelector("table tbody");
        const checkboxes = tabela.querySelectorAll(".contact-checkbox");
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.parentElement.parentElement.remove();
            }
        });
        adicionarEventosCheckbox();
        renumerarContatos();
    });

    const form = document.getElementById("form-input-label");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = nomeInput.value;
        const sobrenome = sobrenomeInput.value;
        const telefone = telefoneInput.value;
        const nomeCompleto = `${nome} ${sobrenome}`;

        adicionarContatoATabela(nomeCompleto, telefone);

        nomeInput.value = '';
        sobrenomeInput.value = '';
        telefoneInput.value = '';
    });

    formatarTelefone();
    adicionarEventosCheckbox();

    const btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener("click", function () {
        const linhasSelecionadas = document.querySelectorAll("table tbody tr.column-highlight");
        if (linhasSelecionadas.length === 1) {
            const linha = linhasSelecionadas[0];
            const nomeCompleto = linha.cells[2].textContent;
            const nomeSobrenome = nomeCompleto.split(" ");
            nomeInput.value = nomeSobrenome[0];
            sobrenomeInput.value = nomeSobrenome.slice(1).join(" ");
            telefoneInput.value = linha.cells[3].textContent;
            linha.remove();
            adicionarEventosCheckbox();
            renumerarContatos();
        }
    });

});
