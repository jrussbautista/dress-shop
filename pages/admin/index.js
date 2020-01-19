import Layout from '../../components/Layout';

const Admin = () => {
  return (
    <Layout>
      <div className="container">
        <div className="page-title"> Add Product </div>
        <form>
          <div>
            <input type="text" name="name" placeholder="Product Name" />
          </div>
          <div>
            <input type="file" name="photo" />
          </div>
          <div>
            <input type="text" name="price" placeholder="Product Price" />
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Product Description"
            />
          </div>
          <div>
            <select name="category" id="">
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>{' '}
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
        }
        .page-title {
          font-size: 3rem;
        }
      `}</style>{' '}
    </Layout>
  );
};

export default Admin;
