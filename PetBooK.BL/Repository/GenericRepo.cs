using PetBooK.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PetBooK.BL.Reo
{
    public class GenericRepo<TEntity> where TEntity : class
    {
        PetBookContext db; 

        public GenericRepo(PetBookContext db)
        {
            this.db = db;
        }

        public List<TEntity> selectall()
        {
            return db.Set<TEntity>().ToList();
        }

        public TEntity selectbyid(int id)
        {
            return db.Set<TEntity>().Find(id);
        }

        public void add(TEntity entity)
        {
            db.Set<TEntity>().Add(entity);

        }

        public void update(TEntity entity)
        {
            db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        public void delete(int id)
        {
            TEntity obj = db.Set<TEntity>().Find(id);
            db.Set<TEntity>().Remove(obj);
        }
        public int Count()
        {
            return db.Set<TEntity>().Count();
        }


        // This method allows you to find entities based on a predicate.
        // example  :Expression<Func<Product, bool>> predicate = p => p.Price > 100;    var expensiveProducts= productRepo.FindBy(predicate);

        public List<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return db.Set<TEntity>().Where(predicate).ToList();
        }


        //This method returns the first entity that matches a given predicate, or null if no such entity is found.
        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return db.Set<TEntity>().FirstOrDefault(predicate);
        }

    }


}
