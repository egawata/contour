import * as React from 'react'
import styles from './ImageContainer.module.css'

interface ImageContainerProps {
    origURL: string
    convertedURL: string
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    origURL,
    convertedURL,
}) => {
    return (
        <div className={styles.container}>
            {origURL && <img src={origURL} alt="original" />}
            {convertedURL && <img src={convertedURL} alt="converted" />}
        </div>
    )
}

export default ImageContainer