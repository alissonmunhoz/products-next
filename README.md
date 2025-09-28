# 📦 Products Next

Aplicação **Next.js + TailwindCSS + TypeScript** para gerenciamento de produtos.  
Frontend integrado a um backend em Go (ou qualquer API REST compatível), permitindo **CRUD completo** (criar, listar, editar e excluir produtos).

---

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/) – React com suporte a Server/Client Components
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) – Estilização utilitária
- [Axios](https://axios-http.com/) – Cliente HTTP para integração com backend
- [ShadCN UI](https://ui.shadcn.com/) – Componentes de UI modernos
- [Lucide Icons](https://lucide.dev/) – Ícones leves e flexíveis

---

## 📂 Estrutura do projeto

```
products-next/
├── public/                 # Arquivos públicos
├── src/
│   ├── app/                # Rotas e páginas (Next.js App Router)
│   ├── components/         # Componentes reutilizáveis (UI, tabelas, modais)
│   ├── hooks/              # Hooks customizados (ex: useProducts)
│   ├── lib/                # Funções auxiliares (ex: formatCurrency)
│   ├── types/              # Tipagens globais (Product, etc.)
│   └── styles/             # Estilos globais
├── .env.local              # Variáveis de ambiente
├── next.config.ts          # Configuração do Next.js
├── tailwind.config.ts      # Configuração do TailwindCSS
├── tsconfig.json           # Configuração do TypeScript
├── package.json            # Dependências e scripts
└── README.md               # Documentação
```

---

## ⚙️ Configuração e execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/alissonmunhoz/products-next.git
   cd products-next
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn
   # ou
   pnpm install
   ```

3. **Execute em modo desenvolvimento**

   ```bash
   npm run dev
   ```

   Acesse em: 👉 [http://localhost:3000](http://localhost:3000)

4. **Build para produção**
   ```bash
   npm run build
   npm start
   ```

---

## 🛠 Funcionalidades

- ✅ **Listagem de produtos** em tabela com paginação
- ✅ **Criação de produto** via modal
- ✅ **Edição de produto**
- ✅ **Exclusão simples e em massa**
- ✅ **Status de estoque** (sem estoque, baixo, disponível)
- ✅ **Formatação de preços em BRL**

---

## 📡 Exemplo de integração com backend

O frontend espera uma API com endpoints REST no formato:

### Criar produto

```http
POST /v1/product
Content-Type: application/json

{
  "name": "Notebook Dell",
  "price": 4500.00,
  "quantity": 5,
  "description": "Notebook para uso profissional"
}
```

### Listar produtos

```http
GET /v1/products
```

### Atualizar produto

```http
PUT /v1/product?id=1
Content-Type: application/json

{
  "name": "Notebook Dell i7",
  "price": 4999.90,
  "quantity": 3
}
```

### Deletar produto

```http
DELETE /v1/product?id=1
```

## Screenshots

![App Screenshot](https://i.imgur.com/uGhJcAj.png)
