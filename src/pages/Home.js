import Navbar from '../components/Home/Navbar';
import Carousel from '../components/Home/Carousel';
import CardGrid from '../components/Home/CardGrid';
import Footer from '../components/Home/Footer';

const cards = [
    { img: 'https://rukminim2.flixcart.com/image/612/612/l4vnbm80/t-shirt/n/u/v/m-askporgfj72665-new-allen-solly-original-imagfzk8ywaprse3.jpeg?q=70', title: 'T-Shirt', text: 'Men Solid Polo Neck Cotton Blend Black T-Shirt' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/3/j/v/xxl-st10-vebnor-original-imagnvrqgv7e5crg.jpeg?q=70', title: 'Shirt', text: 'Men Regular Fit Printed Spread Collar Casual Shirt' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/v/j/u/28-united191-united-denim-original-imahyp8wk9y4qagw.jpeg?q=70', title: 'Jeans', text: 'Men Relaxed Fit Mid Rise Light Blue Jeans' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/trouser/c/v/m/34-el-p-cot-el-cielo-original-imaggu7jtfyrv5sc.jpeg?q=70', title: 'Trousers', text: 'Men Regular Fit Dark Blue Cotton Blend Trousers' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/skirt/7/e/r/free-long-blackk-royal-taylor-original-imag4rf4mwtvg6at-bb.jpeg?q=70', title: 'Skirts', text: 'Women Solid Pleated Black Skirt' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/6/2/g/xl-mntnw-4024-montrez-original-imafg82gbevyfwwz-bb.jpeg?q=70', title: 'Jackets', text: 'Women Washed Denim Jacket' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/p/r/n/s-hoodbulls23-povaxpo-original-imagsgvmx84cpxrz.jpeg?q=70', title: 'Hoodies', text: 'Men Full Sleeve Graphic Print Hooded Sweatshirt' },
    { img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/v/i/w/s-dress-presha-original-imah3dxkfepxfbgp.jpeg?q=70', title: 'Dress', text: 'Women Fit and Flare Black Dress' },
  ];
export function Home() {
    return (
        <>
        <Navbar/>

        <Carousel/>
        <br></br>
        <CardGrid cards={cards} />
        <br></br>
        <Footer/>
        </>
    );
}

export default Home;