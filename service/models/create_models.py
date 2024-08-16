import os

# Definir os modelos a serem criados
models = [
    "stocklive",
    "stockliveitem",
    "category",
    "subcategory",
    "brand",
    "model"
]

model_template = """import {{ DataTypes }} from 'sequelize';
import sequelize from '../config/database-mysql.js';

const {{ Model }} = sequelize;

class {{model}} extends Model {{}}

{{model}}.init({{
  // Defina os atributos aqui, por exemplo:
  // id: {{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }},
  // name: {{ type: DataTypes.STRING, allowNull: false }},
}}, {{
  sequelize,
  modelName: '{{model}}',
  tableName: '{{tableName}}',
  timestamps: true
}});

export default {{model}};
"""

# Criar diretório de modelos se não existir
os.makedirs("models", exist_ok=True)

# Criar arquivos de modelo para cada entidade
for model in models:
    model_capitalized = model.capitalize()  # Capitalizar o nome do modelo
    filename = os.path.join("models", f"{model}.js")  # Usar o nome do modelo em minúsculas
    table_name = model  # Nome da tabela em minúsculas
    with open(filename, "w") as file:
        # Formatar a string com os valores corretos
        file.write(model_template.format(model=model_capitalized, tableName=table_name))

print("Arquivos de modelo criados com sucesso!")
