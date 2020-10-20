'use strict';

const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


describe('categories API', () => {

  it('should respond with 500 on an error', async () => {
    await mockRequest.get('/bad').then((results) => {
      expect(results.status).toBe(500);
    });
  });
  it('should respond with 404 on a wrong route', () => {
    return mockRequest.get('/foo').then((results) => {
      expect(results.status).toBe(404);
    });
  });


  it('can post() a new category', async () => {
    let obj = { name: 'laptop', display_name: 'osama', description: 'Laptop for gaming' };
    await mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        let record = data.body;
        // console.log(data.body);
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  
  it('should respond with 200 on a correct route', () => {
    return mockRequest.get('/api/v1/categories').then((results) => {
      expect(results.status).toBe(200);
    });
  });


  it('can get() a category', () => {
    let obj = { name: 'laptop', display_name: 'osama', description: 'Laptop for gaming' };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        console.log('im the data',data.body);

        return mockRequest.get(`/api/v1/categories/${data.body._id}`).then((record) => {
          console.log('im the dot name',record.body);
          
            expect(record.body.name).toEqual(obj.name);
            // expect(record.status).toBe(200);
          
        });
      });
      
    });

    it('can put() a category item',  () => {
      let obj = { name: 'laptop', display_name: 'osama', description: 'Laptop for gaming' };
      return mockRequest.post('/api/v1/categories').send(obj)
      .then(data=>{
        const postRecord = data.body;
      const updatedProductObj = { name: 'pc', display_name: 'PC', description: 'PC for gaming' };
      return mockRequest.put(`/api/v1/categories/${postRecord._id}`)
      .send(updatedProductObj).then(results=>{
         mockRequest.get(`/api/v1/categories/${postRecord._id}`).then(data=>{
          const productItem = data.body;
        Object.keys(obj).forEach(key => {
            expect(productItem[key]).toEqual(updatedProductObj[key]);
        });
         })
        
      })
      })
     
  });
  it('can delete() a category item',  () => {
    let obj = { name: 'laptop', display_name: 'osama', description: 'Laptop for gaming' };
      return mockRequest.post('/api/v1/categories').send(obj)
      .then(data=>{
        const postRecord = data.body;
        return mockRequest.delete(`/api/v1/categories/${postRecord._id}`)
        .then(results=>{
          console.log('helllllllllllllllo',data.body);
          expect(results.body[0]).toEqual(undefined);
        })
      })

          

  });


  });
  



// const { server } = require('../lib/server.js');
// const supertest = require('supertest');
// const mockRequest = supertest(server);
// describe('api server', () => {
//   it('should respond with 500 on an error', async () => {
//     await mockRequest.get('/bad').then((results) => {
//       expect(results.status).toBe(500);
//     });
//   });
//   it('should respond with 404 on a wrong route', () => {
//     return mockRequest.get('/foo').then((results) => {
//       expect(results.status).toBe(404);
//     });
//   });
//   it('should respond with 200 on a correct route', () => {
//     return mockRequest.get('/categories').then((results) => {
//       expect(results.status).toBe(200);
//     });
//   });
//   it('should respond with 404 on a wrong method', () => {
//     return mockRequest.post('/').then((results) => {
//       expect(results.status).toBe(404);
//     });
//   });
//   it('should respond with 201 for post', () => {
//     return mockRequest.post('/products').then((results) => {
//       expect(results.status).toBe(201);
//     });
//   });
//   it('should respond with 201 for delete', () => {
//     return mockRequest.delete('/products/:id').then((results) => {
//       expect(results.status).toBe(201);
//     });
//   });
//   it('should respond with 201 for put', () => {
//     return mockRequest.put('/products/:id').then((results) => {
//       expect(results.status).toBe(200);
//     });
//   });
// });