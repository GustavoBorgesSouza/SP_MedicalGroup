CREATE DATABASE SPMedGroup_GBm;
GO

--SPMedicalGroup Gustavo Borges - manhã

USE SPMedGroup_GBm;
GO

--Criando tabela de endereço
CREATE TABLE Endereco(
	IdEndereco INT PRIMARY KEY IDENTITY,
	Rua VARCHAR(120) NOT NULL,
	Numero INT NOT NULL,
	Bairro VARCHAR(30) NOT NULL,
	Cidade VARCHAR(40) NOT NULL,
	Estado CHAR(2) NOT NULL,
	CEP CHAR(8) NOT NULL
);
GO


SELECT * FROM Endereco; --Importei a tabela e dados de endereço do excel, por isso verifico aqui

--Criando tabela de Clinica
CREATE TABLE Clinica(
	IdClinica INT PRIMARY KEY IDENTITY,
	IdEndereco INT FOREIGN KEY REFERENCES Endereco(IdEndereco),
	NomeFantasia VARCHAR(25) UNIQUE NOT NULL,
	CNPJ CHAR(14) UNIQUE NOT NULL,
	RazaoSocial VARCHAR(50) UNIQUE NOT NULL,
	HorarioAbertura TIME NOT NULL,
	HorarioFechamento TIME NOT NULL
);
GO

--Criando tabela de Tipos de Usuario
CREATE TABLE TipoUsuario(
	IdTipoUsuario INT PRIMARY KEY IDENTITY,
	TituloTipoUsuario VARCHAR(18) UNIQUE NOT NULL
);
GO

--Criando tabela de Especialidades
CREATE TABLE Especialidade(
	IdEspecialidade INT PRIMARY KEY IDENTITY,
	TituloEspecialidade VARCHAR(50) UNIQUE NOT NULL
);
GO

--Criando tabela de Usuarios
CREATE TABLE Usuario(
	IdUsuario INT PRIMARY KEY IDENTITY,
	IdTipoUsuario INT FOREIGN KEY REFERENCES TipoUsuario(IdTipoUsuario),
	Email VARCHAR(256) UNIQUE NOT NULL,
	Senha VARCHAR(16) NOT NULL
);
GO

--Criando tabela de Pacientes
CREATE TABLE Paciente(
	IdPaciente INT PRIMARY KEY IDENTITY,
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario),
	IdEndereco INT FOREIGN KEY REFERENCES Endereco(IdEndereco),
	NomePaciente VARCHAR(20) NOT NULL,
	DataNascimento DATE NOT NULL,
	Telefone VARCHAR(14) UNIQUE,
	RG CHAR(9) UNIQUE NOT NULL,
	CPF CHAR(11) UNIQUE NOT NULL
);
GO

--Criando tabela de Médicos
CREATE TABLE Medico(
	IdMedico INT PRIMARY KEY IDENTITY,
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario),
	IdClinica INT FOREIGN KEY REFERENCES Clinica(IdClinica),
	IdEspecialidade INT FOREIGN KEY REFERENCES Especialidade(IdEspecialidade),
	NomeMedico VARCHAR(20) NOT NULL,
	SobrenomeMedico VARCHAR(25) NOT NULL,
	CRM CHAR(7) UNIQUE NOT NULL
);
GO

--Criando tabela de Situação/status
CREATE TABLE Situacao(
	IdSituacao INT PRIMARY KEY IDENTITY,
	Situacao VARCHAR(12) UNIQUE NOT NULL
);
GO

--Criando tabela de Consulta
CREATE TABLE Consulta(
	IdConsulta INT PRIMARY KEY IDENTITY,
	IdPaciente INT FOREIGN KEY REFERENCES Paciente(IdPaciente),
	IdMedico INT FOREIGN KEY REFERENCES Medico(IdMedico),
	IdSituacao INT FOREIGN KEY REFERENCES Situacao(IdSituacao) DEFAULT(1),
	DataConsulta SMALLDATETIME NOT NULL,
	DescricaoConsulta VARCHAR(400) DEFAULT(' ')
);
GO