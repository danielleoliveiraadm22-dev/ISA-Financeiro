# Meu Assistente Financeiro — App instalável

## O que mudou

O app agora **se instala pelo navegador**, sem loja e sem custo. E, principalmente,
ele **ensina a instalar** — detectando se a pessoa está no iPhone, no Android ou
dentro do navegador do WhatsApp, e mostrando o passo a passo certo para cada caso.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O aplicativo |
| `manifest.json` | Faz o celular reconhecer como app instalável |
| `sw.js` | Faz funcionar sem internet |
| `icon-192.png` `icon-512.png` `icon-maskable.png` | Ícones na tela inicial |
| `apple-touch-icon.png` | Ícone específico do iPhone |

**Os 6 arquivos precisam ficar na mesma pasta**, lado a lado. Se faltar o
`manifest.json`, o app até abre, mas não instala direito.

## Publicar no seu GitHub

Substitua os arquivos antigos pelos novos e envie:

```
git add .
git commit -m "app instalavel com guia de instalacao"
git push
```

Espere 1 ou 2 minutos e abra o endereço do GitHub Pages no celular.

## Ao publicar uma versão nova depois

Abra o `sw.js` e troque o número da versão na primeira linha:

```js
const VERSAO = 'financeiro-v1';   →   'financeiro-v2'
```

Sem isso, quem já instalou continua vendo a versão velha.

## O que mandar para a cliente

Copie e cole:

> Oi! Segue o link do aplicativo: **[seu link aqui]**
>
> **Importante:** não abra por aqui no WhatsApp. Toque nos três pontinhos
> (⋯) no canto e escolha **"Abrir no Safari"**.
>
> Quando abrir no Safari, vai aparecer uma faixa verde em cima escrito
> "Adicione à tela inicial" — é só tocar nela e seguir as telas.
> O app explica tudo, com desenhos.

## Se ela ainda travar

Peça um print. O app mostra mensagens diferentes conforme o caso, então
o print já diz onde ela está.

## Backup dos dados

Os dados ficam **só no celular dela**. Se ela apagar o ícone, os dados vão junto.

Duas formas de proteger:
- **⚙️ → Baixar backup** gera um arquivo com tudo
- **🔗 Google Sheets → Exportar tudo** manda para a planilha
