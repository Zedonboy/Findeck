# Introduction

Merou is a Message Router for Inter Blockchain communication.if you want your DApps with share info data across chains, merou is the middleman that handles the Message/Packet Transfer like TCP/UDP concepts. The code was heavily adapted from [here](https://github.com/hyperledger-labs/yui-ibc-solidity)

## Getting Started.
1. import the interface `interface/IIBCModule.sol`

2. initialize `IBCHandler` interface with its address in that network like this

```
IIBCHandle _ibchandler = IIBCHandler(<address>);
IIBCHost ibchost = IIBCHost(<address>);

```

3. Send Your Message throught the handler

```
(Channel.Data memory channel, bool found) = ibcHost.getChannel(sourcePort, sourceChannel);
        require(found, "channel not found");
_ibchandler.sendPacket(Packet.Data({
            sequence: ibcHost.getNextSequenceSend(sourcePort, sourceChannel),
            source_port: sourcePort,
            source_channel: sourceChannel,
            destination_port: channel.counterparty.port_id,
            destination_channel: channel.counterparty.channel_id,
            data: FungibleTokenPacketData.encode(data),
            timeout_height: Height.Data({revision_number: 0, revision_height: timeoutHeight}),
            timeout_timestamp: 0
        }));
```

4. Our LighCLients will relay this packet to another chain/network.

For now we have no lightClient node :(, this is a Proof-of-Concept.

Message-Routing-as-a-Service.

5. I need funding to make this project work for hosting light client nodes and documentation writing