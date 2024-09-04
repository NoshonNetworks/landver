// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        string landId;
        address owner;
        string location;
        uint256 area;
        string landUse;
        bool isRegistered;
        bool isVerified;
        string documentHash;
        uint256 lastTransactionTimestamp;
    }

    mapping(string => Land) public lands;
    mapping(address => string[]) public ownerLands;

    event LandRegistered(string landId, address owner, string location, uint256 area, string landUse, string documentHash);
    event LandTransferred(string landId, address from, address to);
    event LandVerified(string landId, address verifier);

    function registerLand(
        string memory _landId,
        address _owner,
        string memory _location,
        uint256 _area,
        string memory _landUse,
        string memory _documentHash
    ) public {
        require(!lands[_landId].isRegistered, "Land is already registered");

        Land memory newLand = Land({
            landId: _landId,
            owner: _owner,
            location: _location,
            area: _area,
            landUse: _landUse,
            isRegistered: true,
            isVerified: false,
            documentHash: _documentHash,
            lastTransactionTimestamp: block.timestamp
        });

        lands[_landId] = newLand;
        ownerLands[_owner].push(_landId);

        emit LandRegistered(_landId, _owner, _location, _area, _landUse, _documentHash);
    }

    function transferLand(string memory _landId, address _newOwner) public {
        require(lands[_landId].isRegistered, "Land is not registered");
        require(lands[_landId].owner == msg.sender, "You are not the owner of this land");
        require(_newOwner != address(0), "Invalid new owner address");

        address currentOwner = lands[_landId].owner;

        // Remove land from current owner's list
        for (uint i = 0; i < ownerLands[currentOwner].length; i++) {
            if (keccak256(bytes(ownerLands[currentOwner][i])) == keccak256(bytes(_landId))) {
                ownerLands[currentOwner][i] = ownerLands[currentOwner][ownerLands[currentOwner].length - 1];
                ownerLands[currentOwner].pop();
                break;
            }
        }

        // Transfer the land ownership
        lands[_landId].owner = _newOwner;
        lands[_landId].lastTransactionTimestamp = block.timestamp;
        ownerLands[_newOwner].push(_landId);

        emit LandTransferred(_landId, currentOwner, _newOwner);
    }

    function verifyLand(string memory _landId) public {
        require(lands[_landId].isRegistered, "Land is not registered");
        require(!lands[_landId].isVerified, "Land is already verified");
        lands[_landId].isVerified = true;
        emit LandVerified(_landId, msg.sender);
    }

    function getLandDetails(string memory _landId) public view returns (Land memory) {
        require(lands[_landId].isRegistered, "Land is not registered");
        return lands[_landId];
    }

    function getOwnerLands(address _owner) public view returns (string[] memory) {
        return ownerLands[_owner];
    }
}