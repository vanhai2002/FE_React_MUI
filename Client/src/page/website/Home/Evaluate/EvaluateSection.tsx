import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const SimilarProductCard = styled(Card)({
  maxWidth: 345,
  margin: "auto",
});

const EvaluateSection = () => {
  const similarProducts = [
    {
      id: 1,
      name: "Similar Shoe 1",
      img: "/src/img/sanpham1-removebg-preview.png",
      price: "500,000 VND",
    },
    {
      id: 2,
      name: "Similar Shoe 2",
      img: "/src/img/sanpham5-removebg-preview.png",
      price: "600,000 VND",
    },
    {
      id: 3,
      name: "Similar Shoe 3",
      img: "/src/img/sanpham3-removebg-preview.png",
      price: "550,000 VND",
    },
    {
      id: 4,
      name: "Similar Shoe 4",
      img: "/src/img/sanpham4-removebg-preview.png",
      price: "700,000 VND",
    },
  ];

  const detailedContent = `
        <p>Lợi ích khi mua Giày nike ari force shadow 16 – Siêu Sale replica 1:1 tại Shop giày Replica™</p>
        <p>Cam kết chỉ bán giày chuẩn chất lượng từ Rep 1:1 - Like Auth - Best Quality từ các xưởng Best Trung Quốc</p>
        <p>Hàng hoá chọn lọc hơn thị trường.</p>
        <p>Luôn sẵn size, sẵn kho, cần là có tại 2 chi nhánh Bắc Nam</p>
        <p>Hàng có sẵn tại Shop. Không qua bên thứ 3 ---> Chất lượng giày qua kiểm định kỹ càng.</p>
        <p>Video quay review, phân biệt so sánh từng chất lượng khác nhau.</p>
        <p>Kinh doanh từ 2018 nên nguồn nhập uy tín, lợi thế sll nên giá bán ra tại shop ưu thế hơn các shop nhỏ lẻ và mới bán, hay mới nhập hàng.</p>
        <p>Nhân viên được đào tạo kiến thức chuyên môn để tư vấn cho khách hàng.</p>
        <p>Sản phẩm đang được khuyến mãi giảm giá cực sốc với số lượng có hạn, nhanh tay đặt hàng ngay hôm nay!</p>
      `;

  return (
    <Box sx={{ padding: 7, bgcolor: "#f9f9f9", mt: 5 }}>
      <Grid container spacing={3}>
        {/* Phần nội dung văn bản */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            fontFamily="Poppins"
            fontWeight={500}
            gutterBottom
            textAlign="center"
            fontSize={50}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            paragraph
            fontFamily="Poppins"
            // textAlign="center"
            dangerouslySetInnerHTML={{ __html: detailedContent }}
          />
        </Grid>

        {/* Phần hình ảnh */}
        <Grid item xs={12} md={4}>
          <img
            src="/src/img/sanpham1-removebg-preview.png"
            alt="Description Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }} // Điều chỉnh style cho phù hợp
          />
          <img
            src="/src/img/buistore-air-jordan-1-retro-high-lost-found-5-removebg-preview.png"
            alt="Description Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }} // Điều chỉnh style cho phù hợp
          />
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        fontFamily="Poppins"
        fontWeight={500}
        gutterBottom
        textAlign="center"
        fontSize={50}
      >
        Similar Products
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {similarProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <SimilarProductCard>
              <CardMedia
                component="img"
                height="140"
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" fontFamily="Poppins" fontWeight={400}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={1}>
                  {product.price}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </SimilarProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EvaluateSection;
