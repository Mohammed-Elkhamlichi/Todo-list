const loginHandler = (req, res) => {
   try {
      res.status(200).json({ success: true });
   } catch (error) {
      console.log(error);
   }
};
export default loginHandler;
