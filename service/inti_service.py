import os

# Definir a estrutura de diretórios e arquivos
structure = {
    "config": ["database.js"],
    "models": ["estoque.js", "ordem.js", "projeto.js"],
    "routes": ["estoqueRoutes.js", "ordemRoutes.js", "projetoRoutes.js"],
    "services": ["movimentacaoService.js"],
    "": ["index.js", "README.md"]
}

def create_structure(base_path, structure):
    for key, value in structure.items():
        dir_path = os.path.join(base_path, key)
        os.makedirs(dir_path, exist_ok=True)
        
        for item in value:
            if isinstance(item, dict):
                create_structure(dir_path, item)
            else:
                file_path = os.path.join(dir_path, item)
                with open(file_path, 'w') as f:
                    pass  # Cria um arquivo vazio

# Caminho base onde a estrutura será criada
base_path = "."

# Criar a estrutura de diretórios e arquivos
create_structure(base_path, structure)

print("Estrutura de diretórios e arquivos criada com sucesso.")
