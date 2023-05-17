import styles from './DiscButtonCh.module.css'

export function DiscButtonCh() {

    // Mask id and stylling
    // Need unique id's for multiple buttons
    const maskId = 'mask_1';
    const maskStyle = '#fancy-masked-element_' + maskId + '{mask: url(#' + maskId + '); -webkit-mask: url(#' + maskId + ')}';

    const buttonStyle = {
        innerWidth: this.props.width,
        innerHeight: this.props.innerHeight
    };

    const fancyFrontStyle = {
        transform: 'rotateX(0deg) translateZ(' + this.props.height / 2 + 'px)'
    };

    const fancyBackStyle = {
        transform: 'rotateX(90deg) translateZ(' + this.props.height / 2 + 'px)'
    };

    // SVG attributes
    const textTransform = 'matrix(1 0 0 1 ' + this.props.width / 2 + ' ' + this.props.height / 1.6 + ')'

    const viewBox = '0 0 ' + this.props.width + ' ' + this.props.height

    return (
        <div>
            <div className={styles.fancyButton}
                style={buttonStyle}
                ref="fancyButton"
            >
                <div className={styles.fancyFlipper}>
                    <div className={styles.fancyFront} style={fancyFrontStyle}>
                        <svg height={this.props.height} width={this.props.width} viewBox={viewBox}>
                            <defs>
                                <mask id={maskId}>
                                    <rect
                                        width="100%" height="100%" fill="#FFFFFF"
                                    />
                                    <text className={styles.maskText && styles.buttonText} fill="#000000" transform={textTransform}
                                        fontFamily="'intro_regular'" fontSize={this.props.fontSize} width="100%" textAnnch
                                    >

                                    </text>
                                </mask>
                            </defs>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
}