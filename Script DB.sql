CREATE TABLE camisa (
    idCamisa INT NOT NULL AUTO_INCREMENT,
    imagen VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    talla VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    idEstampado INT,
    Material VARCHAR(20) NOT NULL,
    numeroPedido INT NOT NULL,
    PRIMARY KEY (idCamisa)
);

CREATE TABLE camisetas (
    idCamiseta INT NOT NULL AUTO_INCREMENT,
    diseño TEXT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    precio INT NOT NULL,
    usuarioEmail VARCHAR(45) NOT NULL,
    PRIMARY KEY (idCamiseta)
);

CREATE TABLE estampado (
    idEstampado INT NOT NULL AUTO_INCREMENT,
    diseño TEXT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    usuarioEmail VARCHAR(45) NOT NULL,
    PRIMARY KEY (idEstampado)
);

CREATE TABLE informacion_envio (
    id INT NOT NULL AUTO_INCREMENT,
    barrio VARCHAR(45) NOT NULL,
    ciudad VARCHAR(45) NOT NULL,
    pais VARCHAR(45) NOT NULL,
    codigoPostal VARCHAR(10) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    usuarioEmail VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE material (
    Material VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (Material)
);

CREATE TABLE pedido (
    numeroPedido INT NOT NULL AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    estado VARCHAR(15) NOT NULL,
    fechaPedido DATE NOT NULL,
    fechaEnvio DATE NOT NULL,
    usuarioEmail VARCHAR(45) NOT NULL,
    informacionEnvioId INT NOT NULL,
    PRIMARY KEY (numeroPedido)
);

CREATE TABLE rol (
    id INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE usuario (
    email VARCHAR(45) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    password VARCHAR(60) NOT NULL,
    rolId INT NOT NULL,
    PRIMARY KEY (email)
);

ALTER TABLE camisa
    ADD CONSTRAINT FK_camisa_material FOREIGN KEY (Material) REFERENCES material(Material) ON DELETE CASCADE;

ALTER TABLE camisa
    ADD CONSTRAINT FK_camisa_pedido FOREIGN KEY (numeroPedido) REFERENCES pedido(numeroPedido) ON DELETE CASCADE;

ALTER TABLE camisetas
    ADD CONSTRAINT FK_camisetas_usuario FOREIGN KEY (usuarioEmail) REFERENCES usuario(email) ON DELETE CASCADE;

ALTER TABLE estampado
    ADD CONSTRAINT FK_estampado_usuario FOREIGN KEY (usuarioEmail) REFERENCES usuario(email) ON DELETE CASCADE;

ALTER TABLE informacion_envio
    ADD CONSTRAINT FK_informacion_envio_usuario FOREIGN KEY (usuarioEmail) REFERENCES usuario(email) ON DELETE CASCADE;

ALTER TABLE pedido
    ADD CONSTRAINT FK_pedido_usuario FOREIGN KEY (usuarioEmail) REFERENCES usuario(email) ON DELETE CASCADE;

ALTER TABLE pedido
    ADD CONSTRAINT FK_pedido_informacion_envio FOREIGN KEY (informacionEnvioId) REFERENCES informacion_envio(id);

ALTER TABLE usuario
    ADD CONSTRAINT FK_usuario_rol FOREIGN KEY (rolId) REFERENCES rol(id) ON UPDATE CASCADE ON DELETE CASCADE;
