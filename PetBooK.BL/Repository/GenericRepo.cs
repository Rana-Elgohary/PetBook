using Microsoft.EntityFrameworkCore;
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

        // EX: Reservation has a relation with clinic and pet, to get the pet data and the clinic data we need include not just select
        public List<TEntity> SelectAll(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = db.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.ToList();
        }

        public TEntity selectbyid(params object[] keyValues)
        {
            return db.Set<TEntity>().Find(keyValues);
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

        public void deleteEntity(TEntity entity)
        {
            db.Set<TEntity>().Remove(entity);
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

        public List<TEntity> SelectAllWithIncludes(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = db.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.ToList();
        }
        public TEntity SelectByIdWithIncludes(int id, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = db.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.FirstOrDefault(e => EF.Property<int>(e, "SecretaryID") == id);
        }
        public List<TEntity> FindByInclude(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = db.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.Where(predicate).ToList();
        }


    }
}
