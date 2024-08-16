import os

# Definir os serviços a serem criados
services = [
    "stockliveService",
    "stockliveitemService",
    "categoryService",
    "subcategoryService",
    "brandService",
    "modelService"
]

service_template = """import {{ {model} }} from '../models/index.js';

// List all {modelLower}s, considering the filter for isDeleted
export const list{model}s = async (includeDeleted = false) => {{
    const where = includeDeleted ? {{}} : {{ isDeleted: false }};
    try {{
        const items = await {model}.findAll({{ where }});
        return items;
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};

// Create a new {modelLower}
export const create{model} = async (data) => {{
    try {{
        const item = await {model}.create(data);
        return item;
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};

// Get a specific {modelLower} by ID, considering the filter for isDeleted
export const get{model}ById = async (id, includeDeleted = false) => {{
    const where = includeDeleted ? {{ id }} : {{ id, isDeleted: false }};
    try {{
        const item = await {model}.findOne({{ where }});
        return item;
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};

// Update an existing {modelLower}
export const update{model} = async (id, data) => {{
    try {{
        const [updated] = await {model}.update(data, {{ where: {{ id }} }});
        return updated ? {{ changes: updated }} : null;
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};

// Create or update the {modelLower} based on its existence in the database
export const createOrUpdate{model} = async (data) => {{
    const {{ id }} = data;
    try {{
        const item = await {model}.findByPk(id);
        if (item) {{
            await update{model}(id, data);
        }} else {{
            await create{model}(data);
        }}
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};

// Mark a {modelLower} as deleted (does not physically delete it)
export const delete{model} = async (id) => {{
    try {{
        const [updated] = await {model}.update({{ isDeleted: true }}, {{ where: {{ id }} }});
        return updated ? {{ changes: updated }} : null;
    }} catch (err) {{
        throw new Error(err.message);
    }}
}};
"""

# Criar diretório de serviços se não existir
os.makedirs("services", exist_ok=True)

# Criar arquivos de serviço para cada entidade
for service in services:
    service_capitalized = service.capitalize()  # Capitalizar o nome do serviço
    filename = os.path.join("services", f"{service}.js")  # Usar o nome do serviço em minúsculas
    with open(filename, "w") as file:
        # Formatar a string com os valores corretos
        file.write(service_template.format(model=service_capitalized, modelLower=service))

print("Arquivos de serviço criados com sucesso!")
