using Microsoft.AspNetCore.Mvc;
using StudentAjaxJquery.Context;
using StudentAjaxJquery.Entity;

namespace StudentAjaxJquery.Controllers
{
    public class AjaxController : Controller
    {
        private readonly StudentContext context;
        public AjaxController(StudentContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            var result = context.Students.ToList();
            return View(result);
        }

        //GetAllStudents
        [HttpGet]
        public JsonResult StudentList()
        {
            var data = context.Students.ToList();
            return new JsonResult(data);
        }

        //Insert
        [HttpPost]
        public JsonResult AddStudent(Student student)
        {
            var stu = new Student()
            {
                Name = student.Name,
                Email = student.Email,
                MobileNo = student.MobileNo,
                City = student.City,
                State = student.State,
                Country = student.Country  
            };
            context.Students.Add(stu);
            context.SaveChanges();
            return new JsonResult("Data is Saved");
        }

        //Delete
        public JsonResult Delete(int id)
        {
            var data = context.Students.Where(e => e.Id == id).SingleOrDefault();
            context.Students.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        //GetById
        public JsonResult Edit(int id)
        {
            var data = context.Students.Where(e => e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        //Update
        [HttpPost]
        public JsonResult Update(Student student)
        {
            context.Students.Update(student);
            context.SaveChanges();
            return new JsonResult("Data Updated");
        }
    }
}
