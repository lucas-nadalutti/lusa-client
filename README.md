# Treinamento em aplicações REST Grails + AngularJS

[Requisitos](#requisitos)

[Dependências](#dependências)

[Arquitetura](#arquitetura)

### Requisitos

RQF-001 - Administração de Produtos

O sistema deverá ser capaz de listar, criar, editar e excluir produtos.

Um produto será caracterizado por: nome, descrição, status (ativo ou inativo), preço de, preço por, imagem, quantidade em estoque, data de criação e de atualização

Não será possível remover produtos que já tenham pedidos associados. Neste caso, podemos somente inativá-los


RQF-002 - Catálogo de produtos

O sistema deverá listar, para o cliente final, produtos disponíveis para compra.

Na listagem, serão exibidos somente produtos com status ativo cujo estoque seja maior que 0.

Para cada item, serão exibidas as informações: nome, preço e quantidade. Além disso, cada item terá um botão de compra que levará ao requisito RQF - 003


RQF-003 - Checkout de Produto

Ao escolher um produto para compra, o cliente será levado à uma nova tela para fechar seu pedido.

Nesta tela, o sistema mostrará um resumo da compra que está sendo feita junto a um formulário onde o cliente final preencherá: nome, email, endereço, forma de pagamento (escolha pelo menos 2 para disponibilizar) e formas de entrega (também no mínimo 2).

Ao preencher e confirmar os dados, o cliente fechará este pedido e receberá um email com os dados de sua compra.

O sistema, portanto, terá gerado um novo pedido para o cliente seguindo as informações inseridas.


### Dependências

* AngularJS como framework
* KarmaJS e Jasmine para testes
* NPM para gerenciamento de dependências
* Outros (ver package.json)


### Arquitetura

* Todas as importações de arquivos estão concentradas no arquivo `index.html`, assim como a inicialização da aplicação (`ng-app="Main"`
* Os arquivos em `app/routes` definem as rotas do sistema, associando cada uma a um controller (definidos em `app/controllers`) e a um template (definidos em `app/templates`)
* As duas grandes entidades da aplicação são `Product` e `Checkout`, que definem as propriedades e comportamentos relacionados a produtos e pedidos, respectivamente
* Os testes estão em `app/tests` e utilizam KarmaJS para testar o comportamento dos controllers da aplicação
