import React from 'react'
import { withController } from 'react-scroll-parallax';
import { ParallaxProvider, Parallax,useController, ParallaxController } from 'react-scroll-parallax';

 
type Props = {
  src: string
  parallaxController: ParallaxController
}
class Image extends React.Component<Props> {
    handleLoad = () => {
        // updates cached values after image dimensions have loaded
        this.props.parallaxController.update();
    };
 
    render() {
        return <img src={this.props.src} onLoad={this.handleLoad} />;
    }
}
 
export default withController(Image);