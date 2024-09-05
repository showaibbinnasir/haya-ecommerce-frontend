import { Button, Input, Label, Spinner, Textarea, toast } from "keep-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditProduct = () => {
    const data = useLoaderData()
    const [isLoading, setIsLoading] = useState(false)
    const handleEditButton = e => {
        e.preventDefault()
        setIsLoading(true)
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
        const description = [des1, des2, des3, des4, des5]
        const addinfo = form.addinfo.value
        const id = data._id
        const product = { name, category, subCategory, price, description, addinfo }
        fetch(`http://localhost:5000/product/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`Updated Successfully`)
                setIsLoading(false)
            })

    }
    return (
        <div>
            <div className="py-5">
                <h1 className="text-2xl text-center font-bold">Update product {data?.name}</h1>
                <h1 className="text-md text-center text-gray-500">Product ID : {data?._id}</h1>
                <div className="flex justify-center my-3">
                    <img className="w-[200px] rounded-full" src={data?.images[0]} alt="" />
                </div>
                <div>
                    <div className="flex justify-center py-5">
                        <form onSubmit={handleEditButton}>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Enter Name</Label>
                                <Input required id="name" defaultValue={data?.name} placeholder="Enter name" type="text" />
                            </fieldset>
                            <div>
                                <label className="label">
                                    <span className="label-text">Product Category</span>
                                </label>
                                <select required defaultValue={data?.category} name='cat' className="w-full h-[40px] rounded-lg">
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
                                <select defaultValue={data?.subCategory} required name='subcat' className="w-full h-[40px] rounded-lg">
                                    <option disabled selected>Man's Product</option>
                                    <option>Woman's Product</option>
                                    <option>Kid's Product</option>
                                </select>
                            </div>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Enter price</Label>
                                <Input defaultValue={data?.price} id="price" required placeholder="Enter name" type="text" />
                            </fieldset>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Description</Label>
                                <Input defaultValue={data?.description[1]} required id="des2" placeholder="Description 2" type="text" />
                                <Input defaultValue={data?.description[2]} required id="des3" placeholder="Description 3" type="text" />
                                <Input defaultValue={data?.description[3]} required id="des4" placeholder="Description 4" type="text" />
                                <Input defaultValue={data?.description[4]} required id="des5" placeholder="Description 5" type="text" />
                                <Input defaultValue={data?.description[0]} required id="des1" placeholder="Description 1" type="text" />
                            </fieldset>
                            <fieldset className="max-w-md space-y-1 w-[350px] lg:w-[450px]">
                                <Label htmlFor="name">Additional Info</Label>
                                <Textarea defaultValue={data?.addinfo} required name="addinfo" placeholder="Write your message here." rows={8} />
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
        </div>
    );
};

export default EditProduct;