CREATE TABLE administrador (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL
);

CREATE TABLE artista (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL
);

CREATE TABLE camisa (
    idCamisa INT NOT NULL PRIMARY KEY,
    imagen VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    talla VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    idEstampado INT,
    Material VARCHAR(20) NOT NULL,
    numeroPedido INT NOT NULL,
    FOREIGN KEY (Material) REFERENCES material(Material) ON DELETE CASCADE,
    FOREIGN KEY (numeroPedido) REFERENCES pedido(numeroPedido) ON DELETE CASCADE,
    FOREIGN KEY (idEstampado) REFERENCES estampado(idEstampado)
);

CREATE TABLE camisetas (
    idCamiseta INT NOT NULL PRIMARY KEY,
    diseño TEXT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    precio INT NOT NULL,
    adminEmail VARCHAR(45) NOT NULL,
    FOREIGN KEY (adminEmail) REFERENCES administrador(email) ON DELETE CASCADE
);

CREATE TABLE cliente (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL
);

CREATE TABLE estampado (
    idEstampado INT NOT NULL PRIMARY KEY,
    diseño TEXT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    artistaEmail VARCHAR(45) NOT NULL,
    FOREIGN KEY (artistaEmail) REFERENCES artista(email) ON DELETE CASCADE
);

CREATE TABLE informacion_envio (
    id INT NOT NULL PRIMARY KEY,
    barrio VARCHAR(45) NOT NULL,
    ciudad VARCHAR(45) NOT NULL,
    pais VARCHAR(45) NOT NULL,
    codigoPostal VARCHAR(10) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    clienteEmail VARCHAR(45) NOT NULL,
    FOREIGN KEY (clienteEmail) REFERENCES cliente(email)
);

CREATE TABLE material (
    Material VARCHAR(20) NOT NULL PRIMARY KEY,
    cantidad INT NOT NULL
);

CREATE TABLE pedido (
    numeroPedido INT NOT NULL PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    estado VARCHAR(15) NOT NULL,
    fechaPedido DATE NOT NULL,
    fechaEnvio DATE NOT NULL,
    clienteEmail VARCHAR(45) NOT NULL,
    informacionEnvioId INT NOT NULL,
    FOREIGN KEY (clienteEmail) REFERENCES cliente(email) ON DELETE CASCADE,
    FOREIGN KEY (informacionEnvioId) REFERENCES informacion_envio(id)
);
