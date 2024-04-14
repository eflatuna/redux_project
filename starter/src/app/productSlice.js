import { createSlice, createAsyncThunk } from "@redux";

const initialState = {
	productsData: [],
	loading: false,
	error: false,
};

export const getProductsData = createAsyncThunk("getProducts", async () => {
	const { data } = await axios("https://dummyjsopn.com/products");
	return data.products;
});
const productSlice = createSlice({
	name: "productsApi",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProductsData, pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getProductsData, fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			.addCase(getProductsData, rejected, (state) => {
				state.loading = false;
				state.error = payload;
			});
	},
});
export default productSlice.reducer;
