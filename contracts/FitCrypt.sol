pragma solidity ^0.5.16;

contract FitCrypt {
    string public name = "FitCrypt";
    // store Images
    // create a mapping for storing immages
    struct Image {
        uint256 id;
        string hashOfImage;
        string description;
        uint256 tipAmount;
        address payable author;
    }
    event ImageCreated(
        uint256 id,
        string hashOfImage,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hashOfImage,
        string description,
        uint256 tipAmount,
        address payable author
    );

    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    modifier hasDescription(string memory _description) {
        require(bytes(_description).length > 0);
        _;
    }

    modifier hasHashOfImage(string memory _hashOfImage) {
        require(bytes(_hashOfImage).length > 0);
        _;
    }

    modifier hasSender(address _author) {
        require(_author != address(0x0));
        _;
    }

    modifier isValidImageId(uint256 _imageId) {
        require(_imageId > 0 && _imageId <= imageCount);
        _;
    }

    function uploadImage(string memory _imageHash, string memory _desc)
        public
        hasDescription(_desc)
        hasHashOfImage(_imageHash)
        hasSender(msg.sender)
    {
        // increase image count essentially the counter variable
        imageCount++;

        images[imageCount] = Image(
            imageCount,
            _imageHash,
            _desc,
            0,
            msg.sender
        );
        emit ImageCreated(imageCount, _imageHash, _desc, 0, msg.sender);
    }

    // Create Images

    // tip Images

    function tipTheImage(uint256 _imageId)
        public
        payable
        isValidImageId(_imageId)
    {
        // You are not allowed to tip your own image
        require(images[_imageId].author != msg.sender);
        Image storage _image = images[_imageId];
        address payable _author = _image.author;
        _author.transfer(msg.value);
        _image.tipAmount += msg.value;
        images[_imageId] = _image;
        emit ImageTipped(
            _imageId,
            _image.hashOfImage,
            _image.description,
            msg.value,
            _author
        );
    }
}
