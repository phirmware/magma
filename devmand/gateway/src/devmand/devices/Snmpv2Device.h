// Copyright (c) 2016-present, Facebook, Inc.
// All rights reserved.
//
// This source code is licensed under the BSD-style license found in the
// LICENSE file in the root directory of this source tree. An additional grant
// of patent rights can be found in the PATENTS file in the same directory.

#pragma once

#include <devmand/channels/snmp/Channel.h>
#include <devmand/channels/snmp/IfMib.h>
#include <devmand/devices/PingDevice.h>

/* TODO use this
#include <ydk/netconf_provider.hpp>
#include <ydk/path_api.hpp>
#include <ydk_openconfig/openconfig_interfaces.hpp>

  ydk::path::Repository repo{};
  ydk::path::NetconfSession session{repo,"127.0.0.1", "admin", "admin",  12022};
  ydk::path::RootSchemaNode schema;

  auto interfaces =
      std::make_shared<openconfig::openconfig_interfaces::Interfaces>();
  auto& interface =
      interfaces.create_datanode("interfaces/interface[ifindex=1]", "");
  ydk::path::Codec s{};
  auto             json = s.encode(bgp, ydk::EncodingFormat::JSON, true);
  std::cerr << json << std::endl;
*/

namespace devmand {
namespace devices {

class Snmpv2Device : public PingDevice {
 public:
  Snmpv2Device(
      Application& application,
      const Id& id,
      bool readonly_,
      const channels::snmp::Peer& peer,
      const channels::snmp::Community& community,
      const channels::snmp::Version& version,
      const std::string& passphrase = "",
      const std::string& securityName = "",
      const channels::snmp::SecurityLevel& securityLevel = "",
      oid proto[] = {});
  Snmpv2Device() = delete;
  virtual ~Snmpv2Device() = default;
  Snmpv2Device(const Snmpv2Device&) = delete;
  Snmpv2Device& operator=(const Snmpv2Device&) = delete;
  Snmpv2Device(Snmpv2Device&&) = delete;
  Snmpv2Device& operator=(Snmpv2Device&&) = delete;

  static std::shared_ptr<devices::Device> createDevice(
      Application& app,
      const cartography::DeviceConfig& deviceConfig);

 public:
  std::shared_ptr<State> getState() override;

 private:
  folly::Future<folly::Unit> addToStateWithInterfaceIndices(
      std::shared_ptr<State> state,
      const devmand::channels::snmp::InterfaceIndicies& interfaceIndices);

 protected:
  void setConfig(const folly::dynamic& config) override {
    (void)config;
    LOG(ERROR) << "set config on unconfigurable device";
  }

 protected:
  channels::snmp::Channel snmpChannel;
};

} // namespace devices
} // namespace devmand
