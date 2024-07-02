using Microsoft.EntityFrameworkCore;
using StudentAjaxJquery.Entity;
using System.Collections.Generic;

namespace StudentAjaxJquery.Context
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions options) : base(options) { }
        public DbSet<Student> Students { get; set; }
    }
}
