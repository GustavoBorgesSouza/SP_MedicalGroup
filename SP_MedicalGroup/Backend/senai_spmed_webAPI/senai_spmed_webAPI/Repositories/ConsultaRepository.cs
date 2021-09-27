using Microsoft.EntityFrameworkCore;
using senai_spmed_webAPI.Context;
using senai_spmed_webAPI.Domains;
using senai_spmed_webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmed_webAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SPMedContext ctx = new SPMedContext();
       
        public void AdicionarDecrição(int idConsulta, Consultum ConsultaComDescricao)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(int idConsulta, Consultum consultaAtualizada)
        {
            throw new NotImplementedException();
        }

        public Consultum BuscarPorId(int idConsulta)
        {
            throw new NotImplementedException();
        }

        public void Cancela(int idConsulta, string status)
        {
            throw new NotImplementedException();
        }

        public void Deletar(int idConsulta)
        {
            throw new NotImplementedException();
        }

        public List<Consultum> ListarMinhas(int idUsuario)
        {
            return ctx.Consulta
                .Select(c => new Consultum
                {
                    IdConsulta = c.IdConsulta,
                    DataConsulta = c.DataConsulta,
                    DescricaoConsulta = c.DescricaoConsulta,
                    IdPacienteNavigation = new Paciente
                    {
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        DataNascimento = c.IdPacienteNavigation.DataNascimento,
                        Telefone = c.IdPacienteNavigation.Telefone,
                        Rg = c.IdPacienteNavigation.Rg,
                        Cpf = c.IdPacienteNavigation.Cpf,

                        IdUsuarioNavigation = new Usuario
                        {
                            IdUsuario = c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario
                        }
                    },
                    IdMedicoNavigation = new Medico
                    {
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,
                        SobrenomeMedico = c.IdMedicoNavigation.SobrenomeMedico,
                        Crm = c.IdMedicoNavigation.Crm,
                        IdEspecialidadeNavigation = new Especialidade
                        {
                            TituloEspecialidade = c.IdMedicoNavigation.IdEspecialidadeNavigation.TituloEspecialidade
                        },

                        IdUsuarioNavigation = new Usuario
                        {
                            IdUsuario = c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario
                        }
                    },
                    IdSituacaoNavigation = new Situacao
                    {
                        Situacao1 = c.IdSituacaoNavigation.Situacao1
                    }
                })
                .Where(c => c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario == idUsuario || c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario == idUsuario).ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta
                .Select(c => new Consultum
                {
                    IdConsulta = c.IdConsulta,
                    DataConsulta = c.DataConsulta,
                    DescricaoConsulta = c.DescricaoConsulta,
                    IdPacienteNavigation = new Paciente
                    {
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        DataNascimento = c.IdPacienteNavigation.DataNascimento,
                        Telefone = c.IdPacienteNavigation.Telefone,
                        Rg = c.IdPacienteNavigation.Rg,
                        Cpf = c.IdPacienteNavigation.Cpf,
                    },
                    IdMedicoNavigation = new Medico
                    {
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,
                        SobrenomeMedico = c.IdMedicoNavigation.SobrenomeMedico,
                        Crm = c.IdMedicoNavigation.Crm,
                        IdEspecialidadeNavigation = new Especialidade
                        {
                            TituloEspecialidade = c.IdMedicoNavigation.IdEspecialidadeNavigation.TituloEspecialidade
                        }, 
                    },
                    IdSituacaoNavigation = new Situacao
                    {
                        Situacao1 = c.IdSituacaoNavigation.Situacao1
                    }
                }).ToList();
        }
    }
}
