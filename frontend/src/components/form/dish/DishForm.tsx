import { ChangeEvent, useEffect, useState } from "react";
import { DishData } from "../../card/dish/DishCard";
import "./DishForm.css";

const DishForm = ({ prevData, onSubmit }: {
    prevData?: DishData,
    onSubmit: (data: DishData) => void
}): JSX.Element => {
    const [formData, setFormData] = useState<DishData>({
        name: "",
        price: "",
        description: "",
        composition: "",
        _links: {
            self: {
                href: ""
            }
        }
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        if (prevData) {
            setFormData(prev => ({
                ...prev,
                name: prevData.name ? prevData.name : "",
                description: prevData.description ? prevData.description : "",
                composition: prevData.composition ? prevData.composition : "",
                price: prevData.price ? prevData.price : "",
            }));
        }
    }, [prevData]);

    const onChangeData = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedImage(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formDataWithImage: DishData = {
            ...formData,
        };

        if (selectedImage) {
            selectedImage?.arrayBuffer().then(buffer => {
                formDataWithImage.image = Array.from(new Uint8Array(buffer));
                onSubmit(formDataWithImage);
            });
        }
        else {
            onSubmit(formDataWithImage);
        }
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="input" name="name" type="text" placeholder="Наименование" value={formData.name} onChange={onChangeData} />
            <input className="input" name="price" pattern="[0-9]+" type="text" placeholder="Цена" value={formData.price} onChange={onChangeData} />
            <input className="input" name="composition" type="text" placeholder="Состав" value={formData.composition} onChange={onChangeData} />
            <textarea className="input" minLength={5} name="description" placeholder="Описание" value={formData.description} onChange={onChangeData} />
            {/* <input className="input" type="file" name="image" title="Выберите изображение" /> */}
            <input
                className="input"
                type="file"
                name="image"
                value={formData.image?.map(i=>i.toString())}
                // title="П"
                onChange={handleImageChange}
            />
            <input className="submit" type="submit" value="Сохранить" />
        </form>
    );
};



export default DishForm;
