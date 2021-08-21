USE SPMedGroup_GBm;
GO

--Selects simples para mostrar as tabelas
SELECT * FROM Endereco;
SELECT * FROM Clinica;
SELECT * FROM TipoUsuario;
SELECT * FROM Especialidade ORDER BY IdEspecialidade asc;
SELECT * FROM Usuario ORDER BY IdUsuario asc;
SELECT * FROM Paciente;
SELECT * FROM Medico;
SELECT * FROM Situacao;
SELECT * FROM Consulta;

--Mostrar Consulta com todas as informações necessárias:
SELECT NomePaciente 'Prontuário', NomeMedico 'Médico', FORMAT(DataConsulta, 'dd/MM/yyyy hh.mm') 'Data da Consulta', Situacao, NomeFantasia 'Clinica', Endereco.Rua, Endereco.Numero, Endereco.Cidade
FROM Consulta
INNER JOIN Medico
ON Medico.IdMedico = Consulta.IdMedico
InNER JOIn Clinica
ON Clinica.IdClinica = Medico.IdClinica
INNER JOIN Endereco
On Endereco.IdEndereco = Clinica.IdEndereco
INNER JOIN Paciente
ON Paciente.IdPaciente = Consulta.IdPaciente
INNER JOIN Endereco E
ON E.IdEndereco = Paciente.IdEndereco
INNER JOIN Situacao
ON Situacao.IdSituacao = Consulta.IdSituacao
ORDER BY Consulta.IdConsulta asc;
GO


--Mostrar a quantidade de usuários:
SELECT COUNT(IdUsuario) 'Quantidade de usuários' FROM Usuario;
GO



--Convertendo data de nascimento para o formato brasileiro
SELECT FORMAT(DataNascimento, 'dd/MM/yyyy')  FROM Paciente;
GO



--Idade do paciente através da data de nascimento (funções nativas e stored procedure)

--Criando a stored procedure
CREATE PROCEDURE Idade
AS 
SELECT NomePaciente 'Paciente', DataNascimento 'Data de nascimento', DATEDIFF(year, (Datanascimento), getdate()) 'Idade do Paciente', Telefone, RG, CPF FROM Paciente;
GO
--chamando/executando a stored procedure
EXEC Idade;
GO



--Função que retorna a quantidade de médicos de uma especialidade(funcitons)

--Criei a função pedindo os medicos que possuam o IdEspecialidade 17(Psquiatria)
CREATE FUNCTION MedicosEspecialidade()
RETURNS TABLE
AS
RETURN
    SELECT
    NomeMedico
    MedicosEspecialidade

    FROM
    [dbo].[Medico]

    WHERE IdEspecialidade = 17;

GO
--Alterei a função para mostrar os de IdEspecialidade que o sql receber
ALTER FUNCTION MedicosEspecialidade(@ID INT)
RETURNS TABLE
AS
RETURN
    SELECT
    NomeMedico
    MedicosEspecialidade

    FROM
    [dbo].[Medico]

    WHERE IdEspecialidade = @ID;

GO

--Chamei a função e podemos colocar o IdEspecialidade que quisermos procurar o médico entre os parenteses, como um parametro
SELECT * FROM MedicosEspecialidade(16);

