// ref: https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component
import {useEffect} from 'react';
import {useState}  from 'react';

const useImage = (path: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);
    const [image, setImage]     = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const isWebUrl = (path || '').startsWith('http') || (path || '').startsWith('//');
                const response = isWebUrl
                    ? await import(path)
                    : await import(/* webpackMode: "eager" */ '../' + path)
                ;
                setImage(response.default);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [path]);

    return {loading, error, image};
};

export default useImage;
