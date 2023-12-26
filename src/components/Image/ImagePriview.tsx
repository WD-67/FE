import { Image } from 'antd';

type Props = {
    listImage: string[]; // Assuming listImage is an array of strings representing image URLs
    width?: number;
};

const ImagePriview = ({ listImage, width }: Props) => {
    
    return (
        <Image.PreviewGroup>
            <div className={`cursor-pointer overflow-hidden w-${width}`}>
                {listImage.map((imageUrl, index) => (
                    <Image
                        key={index}
                        preview={{ mask: false }}
                        src={imageUrl}
                        className='cursor-pointer'
                    />
                ))}
            </div>
        </Image.PreviewGroup >
    );
};

export default ImagePriview;
