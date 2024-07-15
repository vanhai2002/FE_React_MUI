import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useProductsQuery from "../../../hook/UseProductsQuerry";
import NotFound from "../../../page/website/Home/NotFound/NotFound";
import { IdProducts } from "@/interfaces/Products";
import { Link } from "react-router-dom";
import useProductMutation from "../../../hook/UseProductMutation";
import AddIcon from "@mui/icons-material/Add";
import UseCategory from "../../../hook/UseCategory";
import { formatCurrencyVND } from "../../../services/VND/Vnd";
interface Category {
  _id: string;
  name: string;
}
const AdminProductList = () => {
  // Hook calls at the top level
  const { data, isLoading } = useProductsQuery();
  const { mutate } = useProductMutation({ action: "DELETE" });
  const { data: categories, isLoading: loadingCategory } = UseCategory();

  // Handle loading state
  if (isLoading || loadingCategory) return <CircularProgress />;
  if (!data) return <NotFound />;

  const handleDelete = async (id: number | string) => {
    await mutate({ _id: id } as IdProducts);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Danh Sách Sản Phẩm
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product: IdProducts) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{product.discount > 0
                      ? formatCurrencyVND(
                          product.price * (1 - product.discount / 100)
                        )
                      : formatCurrencyVND(product.price)}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: "350px",
                      height: "50px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      fontWeight: 500,
                      padding: "4px",
                    }}
                  >
                    {product.description}
                  </Box>
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? `${product.discount}%` : "Không có"}
                </TableCell>
                <TableCell>
                  {categories?.find((cat: Category) => cat._id === product.category)?.name || "Không có"}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/productAdd`}>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => product._id && handleDelete(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminProductList;
