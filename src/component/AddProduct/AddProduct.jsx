import { Button, Input, Label, Spinner, Textarea, toast } from "keep-react";
import Footer from "../Footer/Footer";
import { useState } from "react";

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const handleProduct = e => {
        setIsLoading(true)
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const category = form.cat.value
        const subCategory = form.subcat.value
        const price = form.price.value
        const des1 = form.des1.value
        const des2 = form.des2.value
        const des3 = form.des3.value
        const des4 = form.des4.value
        const des5 = form.des5.value
        const addinfo = form.addinfo.value
        const image1 = form.thumbnailOne.files[0];
        const image2 = form.thumbnailTwo.files[0]
        const image3 = form.thumbnailThree.files[0]
        const image4 = form.thumbnailFour.files[0]
        const formDataOne = new FormData()
        formDataOne.append('image', image1)
        const formDataTwo = new FormData()
        formDataTwo.append('image', image2)
        const formDataThree = new FormData()
        formDataThree.append('image', image3)
        const formDataFour = new FormData()
        formDataFour.append('image', image4)
        let imageOne = ''
        let imageTwo = ''
        let imageThree = ''
        let imageFour = ''
        // const images = [image1, image2, image3, image4]
        const description = [des1, des2, des3, des4, des5]
        const featuredProduct = false

        // console.log(product);
        fetch("https://api.imgbb.com/1/upload?key=63ff49e7f3a9f352605525982cb4b330", {
            method: 'POST',
            body: formDataOne
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData)
                imageOne = imageData.data?.url
                fetch("https://api.imgbb.com/1/upload?key=63ff49e7f3a9f352605525982cb4b330", {
                    method: 'POST',
                    body: formDataTwo
                })
                    .then(res => res.json())
                    .then(imageData => {
                        console.log(imageData)
                        imageTwo = imageData.data?.url
                        fetch("https://api.imgbb.com/1/upload?key=63ff49e7f3a9f352605525982cb4b330", {
                            method: 'POST',
                            body: formDataThree
                        })
                            .then(res => res.json())
                            .then(imageData => {
                                console.log(imageData)
                                imageThree = imageData.data?.url
                                fetch("https://api.imgbb.com/1/upload?key=63ff49e7f3a9f352605525982cb4b330", {
                                    method: 'POST',
                                    body: formDataFour
                                })
                                    .then(res => res.json())
                                    .then(imageData => {
                                        console.log(imageData)
                                        imageFour = imageData.data?.url
                                        const images = [imageOne, imageTwo, imageThree, imageFour]
                                        const product = { name, category, subCategory, price, description, addinfo, images, featuredProduct }
                                        fetch('https://hayaecommerce-backend.vercel.app/products', {
                                            method: 'POST',
                                            headers: {
                                                'content-type': 'application/json'
                                            },
                                            body: JSON.stringify(product)
                                        })
                                            .then(res => res.json())
                                            .then(data => {

                                                setIsLoading(false)
                                                toast.success('upload successfully')
                                                form.reset()
                                            })

                                    })

                            })

                    })

            })
    }

    // const images = [
    //     {
    //         original: imageOne,
    //         thumbnail: imageOne
    //     },
    //     {
    //         original: imageTwo,
    //         thumbnail: imageTwo
    //     },
    //     {
    //         original: imageThree,
    //         thumbnail: imageThree
    //     }
    // ]
    // const postInfo = {
    //     animal, title, color, uploadDate, sellerLocation, sellerName, sellerEmail, sellerImage, phone, price, description, images, status
    // }
    // console.log(postInfo);

    return (
        <div className="bg-[#E0C6CB]">
            <div className="mx-[15px] lg:mx-[75px]">
                <div>
                    <h1 className="text-2xl text-center font-semibold py-5">Add new product</h1>
                    <div className="flex justify-center py-5">
                        <form onSubmit={handleProduct}>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Enter Name</Label>
                                <Input required id="name" placeholder="Enter name" type="text" />
                            </fieldset>
                            <div>
                                <label className="label">
                                    <span className="label-text">Product Category</span>
                                </label>
                                <select required name='cat' className="w-full h-[40px] rounded-lg">
                                    <option disabled selected>T-Shirt</option>
                                    <option>Shirt</option>
                                    <option>Pant</option>
                                    <option>Panjabi</option>
                                    <option>Hoodie</option>
                                    <option>Joggers</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Product Sub-Category</span>
                                </label>
                                <select required name='subcat' className="w-full h-[40px] rounded-lg">
                                    <option disabled selected>Man's Product</option>
                                    <option>Woman's Product</option>
                                    <option>Kid's Product</option>
                                </select>
                            </div>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Enter price</Label>
                                <Input id="price" required placeholder="Enter name" type="text" />
                            </fieldset>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Description</Label>
                                <Input required id="des2" placeholder="Description 2" type="text" />
                                <Input required id="des3" placeholder="Description 3" type="text" />
                                <Input required id="des4" placeholder="Description 4" type="text" />
                                <Input required id="des5" placeholder="Description 5" type="text" />
                                <Input required id="des1" placeholder="Description 1" type="text" />
                            </fieldset>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Additional Info</Label>
                                <Textarea required name="addinfo" placeholder="Write your message here." rows={8} />
                            </fieldset>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <div>
                                    <h1>Images:</h1>
                                    <div id="fileUpload">
                                        <div className="mb-2 block">
                                            <label
                                                htmlFor="file"
                                                value="Upload file"
                                            />
                                        </div>
                                        <input
                                            id="file"
                                            type="file"
                                            name='thumbnailOne'

                                        />
                                    </div>
                                    <div id="fileUpload">
                                        <div className="mb-2 block">
                                            <label
                                                htmlFor="file"
                                                value="Upload file"
                                            />
                                        </div>
                                        <input
                                            id="file"
                                            type="file"
                                            name='thumbnailTwo'

                                        />
                                    </div>
                                    <div id="fileUpload">
                                        <div className="mb-2 block">
                                            <label
                                                htmlFor="file"
                                                value="Upload file"
                                            />
                                        </div>
                                        <input
                                            id="file"
                                            type="file"
                                            name='thumbnailThree'

                                        />
                                    </div>
                                    <div id="fileUpload">
                                        <div className="mb-2 block">
                                            <label
                                                htmlFor="file"
                                                value="Upload file"
                                            />
                                        </div>
                                        <input
                                            id="file"
                                            type="file"
                                            name='thumbnailFour'

                                        />
                                    </div>
                                </div>
                            </fieldset>
                            {
                                isLoading ?
                                    <Button className="bg-[black] text-white w-[150px] my-5"><Spinner color="info" size="lg" /></Button> :
                                    <Button className="bg-[black] text-white w-[150px] my-5" type="submit">Submit</Button>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AddProduct;