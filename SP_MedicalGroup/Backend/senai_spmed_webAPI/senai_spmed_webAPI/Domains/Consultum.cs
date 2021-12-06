using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai_spmed_webAPI.Domains
{
    public partial class Consultum
    {
        public int IdConsulta { get; set; }
        public int? IdPaciente { get; set; }
        [Required(ErrorMessage ="É necessário cadastrar um médico")]
        public int? IdMedico { get; set; }
        public int? IdSituacao { get; set; }

        [Required(ErrorMessage = "É necessário cadastrar uma data")]
        public DateTime DataConsulta { get; set; }
        public string DescricaoConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
