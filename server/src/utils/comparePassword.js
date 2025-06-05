import bcrypt from "bcrypt";

export const comparePassword = async (password, hashedPassword) => {
   try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;   
   } catch (error) {
    throw new Error(error);
   }
};
