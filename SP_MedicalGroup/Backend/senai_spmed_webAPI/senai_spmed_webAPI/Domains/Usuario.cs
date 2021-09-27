﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai_spmed_webAPI.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Medicos = new HashSet<Medico>();
            Pacientes = new HashSet<Paciente>();
        }

        public int IdUsuario { get; set; }
        public int? IdTipoUsuario { get; set; }

        [Required(ErrorMessage = "O campo email é obrigatório")]
        public string Email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(10, MinimumLength = 3, ErrorMessage ="A senha deve ter de 3 a 10 caractéres")]
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ImagemUsuario ImagemUsuario { get; set; }
        public virtual ICollection<Medico> Medicos { get; set; }
        public virtual ICollection<Paciente> Pacientes { get; set; }
    }
}
